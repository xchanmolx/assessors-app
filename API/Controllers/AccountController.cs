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
            Id = user.Id,
            UserName = user.UserName,
            Email = user.Email,
            FirstName = user.FirstName,
            Token = _tokenService.CreateToken(user).Result
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

        _mapper.Map(user, getUser);

        var result = await _userManager.UpdateAsync(getUser);

        if (result.Succeeded) return Ok(user);

        return BadRequest("Problem updating the user");
    }

    [Authorize]
    [HttpDelete("{id}")]
    public async Task<ActionResult<UserToDeleteDto>> DeleteUser(string id)
    {
        var user = await _userManager.FindByIdAsync(id);

        var userMap = _mapper.Map<UserToDeleteDto>(user);

        var result = await _userManager.DeleteAsync(user);

        if (result.Succeeded) return Ok(userMap);

        return BadRequest("Problem deleting the user");
    }

    [HttpGet("emailexists")]
    public async Task<ActionResult<bool>> CheckEmailExistsAsync([FromQuery] string email)
    {
        return await _userManager.FindByEmailAsync(email) != null;
    }

    [HttpPost("changePassword/{id}")]
    public async Task<ActionResult> changePassword(string id)
    {
        if (string.IsNullOrEmpty(id))
            return NotFound();

        var user = await _userManager.FindByIdAsync(id);

        var token = await _userManager.GeneratePasswordResetTokenAsync(user);

        var result = await _userManager.ResetPasswordAsync(user, token, "Free232469*");

        if (result.Succeeded)
            return Ok(result);

        return BadRequest(result);
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
    {
        var user = await _userManager.FindByNameAsync(loginDto.Email);

        if (user == null) return Unauthorized(new ApiResponse(401));

        var result = await _signInManager.CheckPasswordSignInAsync(user, loginDto.Password, false);

        if (!result.Succeeded) return Unauthorized(new ApiResponse(401));

        return new UserDto
        {
            Id = user.Id,
            UserName = user.UserName,
            Email = user.Email,
            FirstName = user.FirstName,
            Token = _tokenService.CreateToken(user).Result
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

        await _userManager.AddToRoleAsync(user, "Member");

        if (!result.Succeeded) return BadRequest(new ApiResponse(400));

        return new UserDto
        {
            Id = user.Id,
            UserName = user.UserName,
            Email = user.Email,
            FirstName = user.FirstName,
            Token = _tokenService.CreateToken(user).Result
        };
    }
}
}