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
    public class BarangayController : BaseApiController
    {
        private readonly IGenericRepository<Barangay> _barangayRepo;
        private readonly IMapper _mapper;
        public BarangayController(IGenericRepository<Barangay> barangayRepo, IMapper mapper)
        {
            _barangayRepo = barangayRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CountAndListBarangay<Barangay>>> GetBarangays(
            [FromQuery] BarangaySpecParams barangaySpecParams)
        {
            var spec = new BarangayWithSpecification(barangaySpecParams);
            var countSpec = new BarangayWithFiltersForCountSpecification(barangaySpecParams);
            var totalItems = await _barangayRepo.CountAsync(countSpec);

            var data = await _barangayRepo.ListAsync(spec);

            return Ok(new CountAndListBarangay<Barangay>(totalItems, data));
        }

        [HttpPost]
        public async Task<ActionResult<BarangayToCreateDto>> CreateBarangay(BarangayToCreateDto barangayToCreateDto)
        {
            var barangay = _mapper.Map<Barangay>(barangayToCreateDto);

            _barangayRepo.Add(barangay);

            if (await _barangayRepo.SaveAll())
                return Ok(barangay);

            return BadRequest(new ApiResponse(400));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<BarangayToUpdateDto>> UpdateBarangay(int id, BarangayToUpdateDto barangayToUpdateDto)
        {
            var barangayFromRepo = await _barangayRepo.GetByIdAsync(id);

            var barangayToUpdate = _mapper.Map(barangayToUpdateDto, barangayFromRepo);

            if (await _barangayRepo.SaveAll())
                return Ok(barangayToUpdate);

            return BadRequest(new ApiResponse(400, "Problem updating the agricultural land"));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BarangayToDeleteDto>> DeleteBarangay(int id)
        {
            var barangayFromRepo = await _barangayRepo.GetByIdAsync(id);

            _barangayRepo.Delete(barangayFromRepo);

            if (await _barangayRepo.SaveAll())
                return Ok(_mapper.Map<BarangayToDeleteDto>(barangayFromRepo));

            return BadRequest(new ApiResponse(400));
        }
    }
}