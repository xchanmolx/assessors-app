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
    public class IndustrialController : BaseApiController
    {
        private readonly IGenericRepository<IndustrialLand> _induRepo;
        private readonly IMapper _mapper;
        public IndustrialController(IGenericRepository<IndustrialLand> induRepo, IMapper mapper)
        {
            _induRepo = induRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CountAndListKindOfLands<IndustrialLand>>> GetIndustrialLands(
            [FromQuery] KindOfLandsSpecParams industrialSpecParams)
        {
            var spec = new IndustrialWithSpecification(industrialSpecParams);
            var countSpec = new IndustrialWithFiltersForCountSpecification(industrialSpecParams);
            var totalItems = await _induRepo.CountAsync(countSpec);

            var data = await _induRepo.ListAsync(spec);

            return Ok(new CountAndListKindOfLands<IndustrialLand>(totalItems, data));
        }

        [HttpPost]
        public async Task<ActionResult<IndustrialToCreateDto>> CreateIndustrialLand(IndustrialToCreateDto industrialToCreateDto)
        {
            var industrialLand = _mapper.Map<IndustrialLand>(industrialToCreateDto);

            _induRepo.Add(industrialLand);

            if (await _induRepo.SaveAll())
                return Ok(industrialLand);

            return BadRequest(new ApiResponse(400));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<IndustrialToUpdateDto>> UpdateIndustrialLand(int id, IndustrialToUpdateDto industrialToUpdateDto)
        {
            var industrialLandFromRepo = await _induRepo.GetByIdAsync(id);

            var industrialLandToUpdate = _mapper.Map(industrialToUpdateDto, industrialLandFromRepo);

            if (await _induRepo.SaveAll())
                return Ok(industrialLandToUpdate);

            return BadRequest(new ApiResponse(400, "Problem updating the industrial land"));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<IndustrialToDeleteDto>> DeleteIndustrialLand(int id)
        {
            var industrialLandFromRepo = await _induRepo.GetByIdAsync(id);

            _induRepo.Delete(industrialLandFromRepo);

            if (await _induRepo.SaveAll())
                return Ok(_mapper.Map<IndustrialToDeleteDto>(industrialLandFromRepo));

            return BadRequest(new ApiResponse(400));
        }
    }
}