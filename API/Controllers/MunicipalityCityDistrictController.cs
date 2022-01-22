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
    public class MunicipalityCityDistrictController : BaseApiController
    {
        private readonly IGenericRepository<MunicipalityCityDistrict> _munCityDistrictRepo;
        private readonly IMapper _mapper;
        public MunicipalityCityDistrictController(IGenericRepository<MunicipalityCityDistrict> munCityDistrictRepo, IMapper mapper)
        {
            _munCityDistrictRepo = munCityDistrictRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CountAndList<MunicipalityCityDistrict>>> GetMunicipalityCityDistricts(
            [FromQuery] MunicipalityCityDistrictSpecParams municipalityCityDistrictSpecParams)
        {
            var spec = new MunicipalityCityDistrictWithSpecification(municipalityCityDistrictSpecParams);
            var countSpec = new MunicipalityCityDistrictWithFiltersForCountSpecification(municipalityCityDistrictSpecParams);
            var totalItems = await _munCityDistrictRepo.CountAsync(countSpec);

            var data = await _munCityDistrictRepo.ListAsync(spec);

            return Ok(new CountAndList<MunicipalityCityDistrict>(totalItems, data));
        }

        [HttpPost]
        public async Task<ActionResult<MunicipalityCityDistrictToCreateDto>> CreateMunicipalityCityDistrict(MunicipalityCityDistrictToCreateDto municipalityCityDistrictToCreateDto)
        {
            var municipalityCityDistrict = _mapper.Map<MunicipalityCityDistrict>(municipalityCityDistrictToCreateDto);

            _munCityDistrictRepo.Add(municipalityCityDistrict);

            if (await _munCityDistrictRepo.SaveAll())
                return Ok(municipalityCityDistrict);

            return BadRequest(new ApiResponse(400, "Problem saving a municipality / city / district"));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<MunicipalityCityDistrictToUpdateDto>> UpdateMunicipalityCityDistrict(int id, MunicipalityCityDistrictToUpdateDto municipalityCityDistrictToUpdateDto)
        {
            var municipalityCityDistrictFromRepo = await _munCityDistrictRepo.GetByIdAsync(id);

            var municipalityCityDistrictToUpdate = _mapper.Map(municipalityCityDistrictToUpdateDto, municipalityCityDistrictFromRepo);

            if (await _munCityDistrictRepo.SaveAll())
                return Ok(municipalityCityDistrictToUpdate);

            return BadRequest(new ApiResponse(400, "Problem updating a municipality / city / district"));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<MunicipalityCityDistrictToDeleteDto>> DeleteMunicipalityCityDistrict(int id)
        {
            var municipalityCityDistrictFromRepo = await _munCityDistrictRepo.GetByIdAsync(id);

            _munCityDistrictRepo.Delete(municipalityCityDistrictFromRepo);

            if (await _munCityDistrictRepo.SaveAll())
                return Ok(_mapper.Map<MunicipalityCityDistrictToDeleteDto>(municipalityCityDistrictFromRepo));

            return BadRequest(new ApiResponse(400, "Problem deleting a municipality / city / district"));
        }
    }
}