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
        private readonly IGenericRepository<Photo> _photoRepo;
        private readonly IMapper _mapper;
        private readonly IGenericRepository<PropertyLand> _propLandRepo;
        public RealPropertiesController(IGenericRepository<TaxDecOfRealProperty> propertyRepo,
        IGenericRepository<Photo> photoRepo, IMapper mapper, IGenericRepository<PropertyLand> propLandRepo)
        {
            _propertyRepo = propertyRepo;
            _photoRepo = photoRepo;
            _mapper = mapper;
            _propLandRepo = propLandRepo;
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
            propertyParams.TotalAssessedValue = properties.Sum(x => x.KindOfProperties.Sum(x => x.AssessedValue));
            propertyParams.TotalPrevAssessedValue = properties.Sum(x => x.PreviousAssessedValue);
        }

        if (propertyParams.Year > 0)
        {
            properties = properties.Where(x => x.Year == propertyParams.Year).ToList();

            totalItems = properties.Count();
            propertyParams.TotalAssessedValue = properties.Sum(x => x.KindOfProperties.Sum(x => x.AssessedValue));
            propertyParams.TotalPrevAssessedValue = properties.Sum(x => x.PreviousAssessedValue);
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
            propertyParams.TotalAssessedValue = properties.Sum(x => x.KindOfProperties.Sum(x => x.AssessedValue));
            propertyParams.TotalPrevAssessedValue = properties.Sum(x => x.PreviousAssessedValue);
        }

        var data = _mapper.Map<IEnumerable<PropertyToReturnDto>>(properties);

        return Ok(new Pagination<PropertyToReturnDto>(propertyParams.PageIndex, propertyParams.PageSize,
            totalItems, propertyParams.TotalAssessedValue, propertyParams.TotalPrevAssessedValue, data));
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

    [HttpPut("{id}")]
    public async Task<ActionResult<PropertyToUpdateDto>> UpdateProperty(int id, PropertyToUpdateDto propertyToUpdateDto)
    {
        var propertyFromRepo = await _propertyRepo.GetByIdAsync(id);

        var propertyToUpdate = _mapper.Map(propertyToUpdateDto, propertyFromRepo);

        if (await _propertyRepo.SaveAll())
            return Ok(propertyToUpdate);

        return BadRequest(new ApiResponse(400, "Problem updating the real property"));
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult<PropertyToDeleteDto>> DeletePropertyWithPhotos(int id, string subDirectory)
    {
        subDirectory = subDirectory ?? string.Empty;
        string[] picList = Directory.GetFiles(subDirectory);

        var photos = await _photoRepo.ListAllAsync();

        photos = photos.Where(x => x.TaxDecOfRealPropertyId == id).ToList();

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

    [HttpGet("photo/{id}")]
    public async Task<ActionResult<OwnerNamePhotos<PhotoForDetailsDto>>> GetPropertyWithPhotos(int id)
    {
        var realProperty = await _propertyRepo.GetByIdAsync(id);

        var photos = await _photoRepo.ListAllAsync();

        photos = photos.Where(x => x.TaxDecOfRealPropertyId == id).ToList();

        var photosMap = _mapper.Map<IEnumerable<PhotoForDetailsDto>>(photos);

        return Ok(new OwnerNamePhotos<PhotoForDetailsDto>(realProperty.Owner, photosMap));
    }

    [HttpGet("tracer")]
    public async Task<ActionResult<IEnumerable<PropertyToTraceDto>>> GetPropertiesWithSearchLotNo(string lotNo)
    {
        var spec = new PropertyWithKindOfPropertiesSpecification();

        var properties = await _propertyRepo.ListAsync(spec);

        properties = properties.Where(x => x.SurveyLotNo.ToLower().Equals(lotNo)).OrderByDescending(x => x.Year);

        var propertiesMap = _mapper.Map<IEnumerable<PropertyToTraceDto>>(properties);

        return Ok(propertiesMap);
    }

    [HttpGet("revise/{id}")]
    public async Task<ActionResult> GetPropertyWithRevise(int id)
    {
        var spec = new PropertyWithBoundaryKindOfPropertiesSpecification();

        var properties = await _propertyRepo.ListAsync(spec);

        var property = properties.Where(x => x.Id == id).FirstOrDefault();


        var specPropertyLand = new PropertyLandSpecification();

        var propertyLands = await _propLandRepo.ListAsync(specPropertyLand);

        var propertyLand = propertyLands.Where(x => x.TaxDecOfRealPropertyId == property.Id).FirstOrDefault();
        

        var kindOfProperty = property.KindOfProperties.Where(x => x.TaxDecOfRealPropertyId == id).FirstOrDefault();

        decimal marketValueAgri = 0;

        if (kindOfProperty.ActualUse == propertyLand.AgriculturalLand.Name)
        {
            if (kindOfProperty.Classification.Contains("ThirdClass"))
            {
                marketValueAgri = propertyLand.AgriculturalLand.ThirdClass;
            }
            else if(kindOfProperty.Classification.Contains("SecondClass"))
            {
                marketValueAgri = propertyLand.AgriculturalLand.SecondClass;
            }
            else if(kindOfProperty.Classification.Contains("FirstClass"))
            {
                marketValueAgri = propertyLand.AgriculturalLand.FirstClass;
            }
        }

        return Ok(new {propertyLand, marketValueAgri});
    }
}
}