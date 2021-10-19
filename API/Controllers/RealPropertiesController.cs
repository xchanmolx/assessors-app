using System;
using System.Collections.Generic;
using System.IO;
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

            if (!string.IsNullOrEmpty(propertyParams.TaxableExempt))
            {
                if (propertyParams.TaxableExempt.Equals("exempt"))
                {
                    properties = properties.Where(x => x.TaxableExempt.Equals("exempt")).ToList();
                }
                else
                {
                    properties = properties.Where(x => x.TaxableExempt.Equals("taxable")).ToList();
                }

                totalItems = properties.Count();
                propertyParams.TotalAssessedValue = properties.Sum(x => x.AssessedValue);
                propertyParams.TotalPrevAssessedValue = properties.Sum(x => x.PreviousAV);
            }

            if (propertyParams.EffectiveYear > 0)
            {
                properties = properties.Where(x => x.EffectiveYear == propertyParams.EffectiveYear).ToList();

                totalItems = properties.Count();
                propertyParams.TotalAssessedValue = properties.Sum(x => x.AssessedValue);
                propertyParams.TotalPrevAssessedValue = properties.Sum(x => x.PreviousAV);   
            }

            if (!string.IsNullOrEmpty(propertyParams.PropertyLocation))
            {
                switch (propertyParams.PropertyLocation)
                {
                    case "angilan":
                        properties = properties.Where(x => x.PropertyLocation == "angilan").ToList();
                        break;
                    case "bojo":
                        properties = properties.Where(x => x.PropertyLocation == "bojo").ToList();
                        break;
                    case "bonbon":
                        properties = properties.Where(x => x.PropertyLocation == "bonbon").ToList();
                        break;
                    case "esperanza":
                        properties = properties.Where(x => x.PropertyLocation == "esperanza").ToList();
                        break;
                    case "kandingan":
                        properties = properties.Where(x => x.PropertyLocation == "kandingan").ToList();
                        break;
                    case "kantabogon":
                        properties = properties.Where(x => x.PropertyLocation == "kantabogon").ToList();
                        break;
                    case "kawasan":
                        properties = properties.Where(x => x.PropertyLocation == "kawasan").ToList();
                        break;
                    case "olango":
                        properties = properties.Where(x => x.PropertyLocation == "olango").ToList();
                        break;
                    case "poblacion":
                        properties = properties.Where(x => x.PropertyLocation == "poblacion").ToList();
                        break;
                    case "punay":
                        properties = properties.Where(x => x.PropertyLocation == "punay").ToList();
                        break;
                    case "rosario":
                        properties = properties.Where(x => x.PropertyLocation == "rosario").ToList();
                        break;
                    case "saksak":
                        properties = properties.Where(x => x.PropertyLocation == "saksak").ToList();
                        break;
                    case "tampaan":
                        properties = properties.Where(x => x.PropertyLocation == "tampaan").ToList();
                        break;
                    case "toyokon":
                        properties = properties.Where(x => x.PropertyLocation == "toyokon").ToList();
                        break;
                    case "zaragosa":
                        properties = properties.Where(x => x.PropertyLocation == "zaragosa").ToList();
                        break;
                    default:
                        properties = properties.Where(x => x.PropertyLocation == "angilan").ToList();
                        break;
                }

                totalItems = properties.Count();
                propertyParams.TotalAssessedValue = properties.Sum(x => x.AssessedValue);
                propertyParams.TotalPrevAssessedValue = properties.Sum(x => x.PreviousAV);
            }

            var data = _mapper.Map<IEnumerable<PropertyToReturnDto>>(properties);

            return Ok(new Pagination<PropertyToReturnDto>(propertyParams.PageIndex, propertyParams.PageSize,
                totalItems, propertyParams.TotalAssessedValue, propertyParams.TotalPrevAssessedValue, data));
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
                return Ok(property);

            return BadRequest(new ApiResponse(400));
        }

        [HttpGet("tracer")]
        public async Task<ActionResult<IEnumerable<PropertyToTraceDto>>> SearchLotNo(string lotNo)
        {
            var properties = await _propertyRepo.SearchAllLotNoAsync(lotNo);

            var propertiesMap = _mapper.Map<IEnumerable<PropertyToTraceDto>>(properties);

            return Ok(propertiesMap);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<OwnerNamePhotos<PhotoForDetailsDto>>> GetProperty(int id)
        {
            var realProperty = await _propertyRepo.GetByIdAsync(id);

            var photos = await _photoRepo.PhotosWithSameId(id);

            var photosMap = _mapper.Map<IEnumerable<PhotoForDetailsDto>>(photos);
            
            return Ok(new OwnerNamePhotos<PhotoForDetailsDto>(realProperty.OwnerName, photosMap));
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<PropertyToDeleteDto>> DeleteProperty(int id, string subDirectory)
        {
            subDirectory = subDirectory ?? string.Empty;
            string[] picList = Directory.GetFiles(subDirectory);

            var photos = await _photoRepo.PhotosWithSameId(id);

            var propertyFromRepo = await _propertyRepo.GetByIdAsync(id);

            if (propertyFromRepo.Id > 0)
            {
                _propertyRepo.Delete(propertyFromRepo);

                foreach (var pic in picList)
                {
                    foreach (var photo in photos)
                    {
                        if (pic == photo.Url)
                        {
                            System.IO.File.Delete(pic);
                        }
                    }
                }
            }

            if (await _propertyRepo.SaveAll())
                return Ok(_mapper.Map<PropertyToDeleteDto>(propertyFromRepo));

            return BadRequest(new ApiResponse(400));
        }
    }
}