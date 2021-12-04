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
    public class CommercialController : BaseApiController
    {
        private readonly IGenericRepository<CommercialLand> _commRepo;
        private readonly IMapper _mapper;
        public CommercialController(IGenericRepository<CommercialLand> commRepo, IMapper mapper)
        {
            _commRepo = commRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<CommercialLand>> GetCommercialLands()
        {
            var spec = new CommercialOrderByNameSpecification();
            var commLands = await _commRepo.ListAsync(spec);

            return Ok(commLands);
        }

        [HttpPost]
        public async Task<ActionResult<CommercialToCreateDto>> CreateCommercialLand(CommercialToCreateDto commercialToCreateDto)
        {
            var commercialLand = _mapper.Map<CommercialLand>(commercialToCreateDto);

            _commRepo.Add(commercialLand);

            if (await _commRepo.SaveAll())
                return Ok(commercialLand);

            return BadRequest(new ApiResponse(400));
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<CommercialToUpdateDto>> UpdateCommercialLand(int id, CommercialToUpdateDto commercialToUpdateDto)
        {
            var commercialLandFromRepo = await _commRepo.GetByIdAsync(id);

            var commercialLandToUpdate = _mapper.Map(commercialToUpdateDto, commercialLandFromRepo);

            if (await _commRepo.SaveAll())
                return Ok(commercialLandToUpdate);

            return BadRequest(new ApiResponse(400, "Problem updating the commercial land"));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<CommercialToDeleteDto>> DeleteCommercialLand(int id)
        {
            var commercialLandFromRepo = await _commRepo.GetByIdAsync(id);

            _commRepo.Delete(commercialLandFromRepo);

            if (await _commRepo.SaveAll())
                return Ok(_mapper.Map<CommercialToDeleteDto>(commercialLandFromRepo));

            return BadRequest(new ApiResponse(400));
        }
    }
}