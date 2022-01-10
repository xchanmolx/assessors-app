using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class StaffController : BaseApiController
    {
        private readonly IGenericRepository<Staff> _staffRepo;
        private readonly IMapper _mapper;
        public StaffController(IGenericRepository<Staff> staffRepo, IMapper mapper)
        {
            _staffRepo = staffRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CountAndList<Staff>>> GetStaffs(
            [FromQuery] StaffSpecParams staffSpecParams)
        {
            var spec = new StaffWithSpecification(staffSpecParams);
            var countSpec = new StaffWithFiltersForCountSpecification(staffSpecParams);
            var totalItems = await _staffRepo.CountAsync(countSpec);

            var data = await _staffRepo.ListAsync(spec);

            return Ok(new CountAndList<Staff>(totalItems, data));
        }

        [HttpPost]
        public async Task<ActionResult<StaffToCreateDto>> CreateStaff(StaffToCreateDto staffToCreateDto)
        {
            var staff = _mapper.Map<Staff>(staffToCreateDto);

            _staffRepo.Add(staff);

            if (await _staffRepo.SaveAll())
                return Ok(staff);

            return BadRequest(new ApiResponse(400));
        }
    }
}