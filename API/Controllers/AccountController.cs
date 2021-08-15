using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Extensions;
using AutoMapper;
using Core.Entities.Identity;
using Core.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly UserManager<AppUser> _userManager;
        private readonly SignInManager<AppUser> _signInManager;
        private readonly ITokenService _tokenService;
        private readonly IMapper _mapper;
        public AccountController(UserManager<AppUser> userManager, SignInManager<AppUser> signInManager,
        ITokenService tokenService, IMapper mapper)
        {
            _mapper = mapper;
            _tokenService = tokenService;
            _signInManager = signInManager;
            _userManager = userManager;
        }

    [Authorize]
    [HttpGet]
    public async Task<ActionResult<UserDto>> GetCurrentUser()
    {
        var user = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);

        return new UserDto
        {
            Email = user.Email,
            FirstName = user.FirstName,
            Token = _tokenService.CreateToken(user)
        };
    }

    [Authorize]
    [HttpGet("{email}")]
    public async Task<ActionResult<AppUserDto>> GetUser(string email)
    {
        var user = await _userManager.FindByEmailAsync(email);

        if (user == null) return BadRequest(new ApiResponse(404));

        return Ok(_mapper.Map<AppUser, AppUserDto>(user));
    }

    [Authorize]
    [HttpPut("edit")]
    public async Task<ActionResult<AppUserDto>> UpdateUser(AppUserDto user)
    {
        var getUser = await _userManager.FindByEmailFromClaimsPrinciple(HttpContext.User);

        getUser.FirstName = user.FirstName;
        getUser.LastName = user.LastName;
        getUser.Gender = user.Gender;
        getUser.PhoneNumber = user.PhoneNumber;
        getUser.Address = user.Address;

        var result = await _userManager.UpdateAsync(getUser);

        if (result.Succeeded) return Ok(user);

        return BadRequest("Problem updating the user");
    }

    [HttpGet("emailexists")]
    public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
    {
        return await _userManager.FindByEmailAsync(email) != null;
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByEmailAsync(loginDto.Email);

        if (user == null) return Unauthorized(new ApiResponse(401));

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

        return new UserDto
        {
            Email = user.Email,
            FirstName = user.FirstName,
            Token = _tokenService.CreateToken(user)
        };
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
    {
        if (CheckEmailExistsAsync(registerDto.Email).Result.Value)
        {
            return new BadRequestObjectResult(new ApiValidationErrorResponse { Errors = new[] { "Email address is in use" } });
        }

        var user = new AppUser
        {
            FirstName = registerDto.FirstName,
            LastName = registerDto.LastName,
            Gender = registerDto.Gender,
            PhoneNumber = registerDto.PhoneNumber,
            Address = registerDto.Address,
            Email = registerDto.Email,
            UserName = registerDto.Email
        };

        var result = await _userManager.CreateAsync(user, registerDto.Password);

        if (!result.Succeeded) return BadRequest(new ApiResponse(400));

        return new UserDto
        {
            Email = user.Email,
            FirstName = user.FirstName,
            Token = _tokenService.CreateToken(user)
        };
    }
}
}