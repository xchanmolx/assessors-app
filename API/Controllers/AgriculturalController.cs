using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
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
        public async Task<ActionResult<AgriculturalLand>> GetAgriculturalLands()
        {
            var spec = new AgriculturalOrderByNameSpecification();
            var agriLands = await _agriRepo.ListAsync(spec);

            return Ok(agriLands);
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