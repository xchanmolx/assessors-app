using System.Collections.Generic;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using API.Helpers;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Core.Specifications;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    [Authorize]
    public class RealPropertiesController : BaseApiController
    {
        private readonly IGenericRepository<TaxDecOfRealProperty> _propertyRepo;
        private readonly IMapper _mapper;
        public RealPropertiesController(IGenericRepository<TaxDecOfRealProperty> propertyRepo, IMapper mapper)
        {
            _mapper = mapper;
            _propertyRepo = propertyRepo;
        }

        [HttpGet]
        public async Task<ActionResult<Pagination<PropertyToReturnDto>>> GetProperties(
            [FromQuery] PropertySpecParams propertyParams)
        {
            var spec = new PropertyWithRealPropertiesSpecification(propertyParams);

            var countSpec = new PropertyWithFiltersForCountSpecification(propertyParams);

            var totalItems = await _propertyRepo.CountAsync(countSpec);

            var properties = await _propertyRepo.ListAsync(spec);

            var data = _mapper.Map<IEnumerable<TaxDecOfRealProperty>, IEnumerable<PropertyToReturnDto>>(properties);

            return Ok(new Pagination<PropertyToReturnDto>(propertyParams.PageIndex, propertyParams.PageSize,
                totalItems, data));
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<PropertyToReturnDto>> GetProperty(int id)
        {
            var spec = new PropertyWithRealPropertiesSpecification(id);

            var property = await _propertyRepo.GetEntityWithSpec(spec);

            if (property == null) return NotFound(new ApiResponse(404));

            return _mapper.Map<TaxDecOfRealProperty, PropertyToReturnDto>(property);
        }
    }
}