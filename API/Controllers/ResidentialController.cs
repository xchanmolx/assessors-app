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
    public class ResidentialController : BaseApiController
    {
        private readonly IGenericRepository<ResidentialLand> _resiRepo;
        private readonly IMapper _mapper;
        public ResidentialController(IGenericRepository<ResidentialLand> resiRepo, IMapper mapper)
        {
            _resiRepo = resiRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CountAndListKindOfLands<ResidentialLand>>> GetResidentialLands(
            [FromQuery] KindOfLandsSpecParams residentialSpecParams)
        {
            var spec = new ResidentialWithSpecification(residentialSpecParams);
            var countSpec = new ResidentialWithFiltersForCountSpecification(residentialSpecParams);
            var totalItems = await _resiRepo.CountAsync(countSpec);

            var data = await _resiRepo.ListAsync(spec);

            return Ok(new CountAndListKindOfLands<ResidentialLand>(totalItems, data));
        }

        [HttpPost]
        public async Task<ActionResult<ResidentialToCreateDto>> CreateResidentialLand(ResidentialToCreateDto residentialToCreateDto)
        {
            var residentialLand = _mapper.Map<ResidentialLand>(residentialToCreateDto);

            _resiRepo.Add(residentialLand);

            if (await _resiRepo.SaveAll())
                return Ok(residentialLand);

            return BadRequest(new ApiResponse(400));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<ResidentialToUpdateDto>> UpdateResidentialLand(int id, ResidentialToUpdateDto residentialToUpdateDto)
        {
            var residentialLandFromRepo = await _resiRepo.GetByIdAsync(id);

            var residentialLandToUpdate = _mapper.Map(residentialToUpdateDto, residentialLandFromRepo);

            if (await _resiRepo.SaveAll())
                return Ok(residentialLandToUpdate);

            return BadRequest(new ApiResponse(400, "Problem updating the residential land"));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<ResidentialToDeleteDto>> DeleteResidentialLand(int id)
        {
            var residentialLandFromRepo = await _resiRepo.GetByIdAsync(id);

            _resiRepo.Delete(residentialLandFromRepo);

            if (await _resiRepo.SaveAll())
                return Ok(_mapper.Map<ResidentialToDeleteDto>(residentialLandFromRepo));

            return BadRequest(new ApiResponse(400));
        }
    }
}