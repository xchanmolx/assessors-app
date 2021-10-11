using System;
using System.Collections.Generic;
using System.IO;
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
    public class RealPropertiesController : BaseApiController
    {
        private readonly IGenericRepository<TaxDecOfRealProperty> _propertyRepo;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<Photo> _photoRepo;
        public RealPropertiesController(IGenericRepository<TaxDecOfRealProperty> propertyRepo,
        IGenericRepository<Photo> photoRepo, IMapper mapper)
        {
            _propertyRepo = propertyRepo;
            _photoRepo = photoRepo;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<PropertyToReturnDto>>> GetProperties(
            [FromQuery] PropertySpecParams propertyParams)
        {
            var spec = new PropertyWithRealPropertiesSpecification(propertyParams);

            var countSpec = new PropertyWithFiltersForCountSpecification(propertyParams);

            var totalItems = await _propertyRepo.CountAsync(countSpec);

            var properties = await _propertyRepo.ListAsync(spec);

            var data = _mapper.Map<IEnumerable<PropertyToReturnDto>>(properties);

            return Ok(new Pagination<PropertyToReturnDto>(propertyParams.PageIndex, propertyParams.PageSize,
                totalItems, data));
        }

        [HttpGet("tracer")]
        public async Task<ActionResult<IEnumerable<PropertyToReturnDto>>> SearchLotNo(string lotNo)
        {
            var properties = await _propertyRepo.SearchAllLotNoAsync(lotNo);

            var propertiesMap = _mapper.Map<IEnumerable<PropertyToReturnDto>>(properties);

            return Ok(propertiesMap);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<PhotoForDetailsDto>>> GetProperty(int id)
        {
            var photos = await _photoRepo.PhotosWithSameId(id);

            var photosMap = _mapper.Map<IEnumerable<PhotoForDetailsDto>>(photos);

            return Ok(photosMap);
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProperty(int id, PropertyToUpdateDto propertyToUpdateDto)
        {
            var propertyFromRepo = await _propertyRepo.GetByIdAsync(id);

            _mapper.Map(propertyToUpdateDto, propertyFromRepo);

            if (await _propertyRepo.SaveAll())
                return Ok(propertyToUpdateDto);

            return BadRequest(new ApiResponse(400, "Problem updating the real property"));
        }

        [HttpPost]
        public async Task<ActionResult<PropertyToCreateDto>> CreateProperty(PropertyToCreateDto propertyToCreateDto)
        {
            var property = _mapper.Map<TaxDecOfRealProperty>(propertyToCreateDto);

            _propertyRepo.Add(property);

            if (await _propertyRepo.SaveAll())
                return Ok(propertyToCreateDto);

            return BadRequest(new ApiResponse(400));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<PropertyToDeleteDto>> DeleteProperty(int id)
        {
            var propertyFromRepo = await _propertyRepo.GetByIdAsync(id);

            if (propertyFromRepo.Id > 0)
            {
                _propertyRepo.Delete(propertyFromRepo);
            }

            if (await _propertyRepo.SaveAll())
                return Ok(_mapper.Map<PropertyToDeleteDto>(propertyFromRepo));

            return BadRequest(new ApiResponse(400));
        }
    }
}