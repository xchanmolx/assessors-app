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
    public class ProvinceController : BaseApiController
    {
        private readonly IGenericRepository<Province> _provinceRepo;
        private readonly IMapper _mapper;
        public ProvinceController(IGenericRepository<Province> provinceRepo, IMapper mapper)
        {
            _provinceRepo = provinceRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CountAndList<Province>>> GetProvinces(
            [FromQuery] ProvinceSpecParams provinceSpecParams)
        {
            var spec = new ProvinceWithSpecification(provinceSpecParams);
            var countSpec = new ProvinceWithFiltersForCountSpecification(provinceSpecParams);
            var totalItems = await _provinceRepo.CountAsync(countSpec);

            var data = await _provinceRepo.ListAsync(spec);

            return Ok(new CountAndList<Province>(totalItems, data));
        }

        [HttpPost]
        public async Task<ActionResult<ProvinceToCreateDto>> CreateProvince(ProvinceToCreateDto provinceToCreateDto)
        {
            var province = _mapper.Map<Province>(provinceToCreateDto);

            _provinceRepo.Add(province);

            if (await _provinceRepo.SaveAll())
                return Ok(province);

            return BadRequest(new ApiResponse(400, "Problem saving a province"));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ProvinceToUpdateDto>> UpdateProvince(int id, ProvinceToUpdateDto provinceToUpdateDto)
        {
            var provinceFromRepo = await _provinceRepo.GetByIdAsync(id);

            var provinceToUpdate = _mapper.Map(provinceToUpdateDto, provinceFromRepo);

            if (await _provinceRepo.SaveAll())
                return Ok(provinceToUpdate);

            return BadRequest(new ApiResponse(400, "Problem updating a province"));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ProvinceToDeleteDto>> DeleteProvince(int id)
        {
            var provinceFromRepo = await _provinceRepo.GetByIdAsync(id);

            _provinceRepo.Delete(provinceFromRepo);

            if (await _provinceRepo.SaveAll())
                return Ok(_mapper.Map<ProvinceToDeleteDto>(provinceFromRepo));

            return BadRequest(new ApiResponse(400, "Problem deleting a province"));
        }
    }
}