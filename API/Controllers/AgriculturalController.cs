using System.Collections.Generic;
using System.Linq;
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
    public class AgriculturalController : BaseApiController
    {
        private readonly IGenericRepository<AgriculturalLand> _agriRepo;
        private readonly IMapper _mapper;
        public AgriculturalController(IGenericRepository<AgriculturalLand> agriRepo, IMapper mapper)
        {
            _agriRepo = agriRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CountAndListKindOfLands<AgriculturalLand>>> GetAgriculturalLands(
            [FromQuery] KindOfLandsSpecParams agriculturalSpecParams)
        {
            var spec = new AgriculturalWithSpecification(agriculturalSpecParams);
            var countSpec = new AgriculturalWithFiltersForCountSpecification(agriculturalSpecParams);
            var totalItems = await _agriRepo.CountAsync(countSpec);

            var data = await _agriRepo.ListAsync(spec);

            return Ok(new CountAndListKindOfLands<AgriculturalLand>(totalItems, data));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<AgriculturalLand>> GetAgriculturalLand(int id)
        {
            var agriculturalLandFromRepo = await _agriRepo.GetByIdAsync(id);

            return Ok(agriculturalLandFromRepo);
        }

        [HttpPost]
        public async Task<ActionResult<AgriculturalToCreateDto>> CreateAgriculturalLand(AgriculturalToCreateDto agriculturalToCreateDto)
        {
            var agriculturalLand = _mapper.Map<AgriculturalLand>(agriculturalToCreateDto);

            _agriRepo.Add(agriculturalLand);

            if (await _agriRepo.SaveAll())
                return Ok(agriculturalLand);

            return BadRequest(new ApiResponse(400));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<AgriculturalToUpdateDto>> UpdateAgriculturalLand(int id, AgriculturalToUpdateDto agriculturalToUpdateDto)
        {
            var agriculturalLandFromRepo = await _agriRepo.GetByIdAsync(id);

            var agriculturalLandToUpdate = _mapper.Map(agriculturalToUpdateDto, agriculturalLandFromRepo);

            if (await _agriRepo.SaveAll())
                return Ok(agriculturalLandToUpdate);

            return BadRequest(new ApiResponse(400, "Problem updating the agricultural land"));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<AgriculturalToDeleteDto>> DeleteAgriculturalLand(int id)
        {
            var agriculturalLandFromRepo = await _agriRepo.GetByIdAsync(id);

            _agriRepo.Delete(agriculturalLandFromRepo);

            if (await _agriRepo.SaveAll())
                return Ok(_mapper.Map<AgriculturalToDeleteDto>(agriculturalLandFromRepo));

            return BadRequest(new ApiResponse(400));
        }
    }
}