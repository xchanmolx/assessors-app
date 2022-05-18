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
        private readonly IGenericRepository<AgriculturalLand> _agriRepo;
        private readonly IGenericRepository<CommercialLand> _commRepo;
        private readonly IGenericRepository<IndustrialLand> _induRepo;
        private readonly IGenericRepository<ResidentialLand> _resiRepo;
        private readonly IGenericRepository<KindOfProperty> _kindOfPropertyRepo;
        private decimal _totalAssessedValue;
        private decimal _totalPrevAssessedValue;
        public RealPropertiesController(IGenericRepository<TaxDecOfRealProperty> propertyRepo,
        IGenericRepository<Photo> photoRepo, IGenericRepository<AgriculturalLand> agriRepo,
        IGenericRepository<CommercialLand> commRepo, IGenericRepository<IndustrialLand> induRepo, 
        IGenericRepository<ResidentialLand> resiRepo, IGenericRepository<KindOfProperty> kindOfPropertyRepo, IMapper mapper)
        {
            _propertyRepo = propertyRepo;
            _photoRepo = photoRepo;
            _mapper = mapper;
            _agriRepo = agriRepo;
            _commRepo = commRepo;
            _induRepo = induRepo;
            _resiRepo = resiRepo;
            _kindOfPropertyRepo = kindOfPropertyRepo;
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
            }

            if (propertyParams.Year > 0)
            {
                properties = properties.Where(x => x.Year == propertyParams.Year).ToList();

                totalItems = properties.Count();
            }

            if (!string.IsNullOrEmpty(propertyParams.Barangay))
            {
                properties = properties.Where(x => x.Barangay == propertyParams.Barangay).ToList();

                totalItems = properties.Count();
            }

            var data = _mapper.Map<IEnumerable<PropertyToReturnDto>>(properties);

            return Ok(new Pagination<PropertyToReturnDto>(propertyParams.PageIndex, propertyParams.PageSize, totalItems, data));
        }

        [HttpGet("revise")]
        public async Task<ActionResult<CountAndReviseList<ReviseToReturnDto>>> GetPropertiesWithRevise(
            [FromQuery] ReviseSpecParams reviseParams)
        {
            var spec = new RevisePropertyWithRealPropertiesSpecification(reviseParams);

            var countSpec = new RevisePropertyWithFiltersForCountSpecification(reviseParams);

            var totalItems = await _propertyRepo.CountAsync(countSpec);

            var properties = await _propertyRepo.ListAsync(spec);

            // Year - Property List
            properties = properties.Where(x => x.Year == reviseParams.Year).ToList();

            // Barangay - Property List
            properties = properties.Where(x => x.Barangay == reviseParams.Barangay).ToList();

            totalItems = properties.Count();

            var data = _mapper.Map<IEnumerable<ReviseToReturnDto>>(properties);

            return Ok(new CountAndReviseList<ReviseToReturnDto>(totalItems, data));
        }

        [HttpGet("assessment-roll")]
        public async Task<ActionResult<CountAndAssessmentRoll<AssessmentRollToReturnDto>>> GetPropertiesWithAssessmentRoll(
            [FromQuery] AssessmentRollSpecParams assessmentRollParams)
        {
            var spec = new AssessmentRollPropertyWithRealPropertiesSpecification();

            var countSpec = new AssessmentRollPropertyWithFiltersForCountSpecification();

            var totalItems = await _propertyRepo.CountAsync(countSpec);

            var properties = await _propertyRepo.ListAsync(spec);
            
            // Taxable or Exempt - Property List
            properties = properties.Where(x => x.TaxableExempt == assessmentRollParams.TaxableExempt).ToList();

            // Barangay - Property List
            properties = properties.Where(x => x.Barangay == assessmentRollParams.Barangay).ToList();

            // Year - Property List
            properties = properties.Where(x => x.Year == assessmentRollParams.Year).ToList();

            totalItems = properties.Count();
            _totalAssessedValue = properties.Sum(x => x.KindOfProperties.Sum(x => x.AssessedValue));
            _totalPrevAssessedValue = properties.Sum(x => x.PreviousAssessedValue);

            var data = _mapper.Map<IEnumerable<AssessmentRollToReturnDto>>(properties);

            return Ok(new CountAndAssessmentRoll<AssessmentRollToReturnDto>(_totalAssessedValue, _totalPrevAssessedValue, totalItems, data));
        }
        
        [HttpGet("revise/{id}")]
        public async Task<ActionResult<PropertyToReturnDto>> GetPropertyWithReviseId(int id)
        {
            var spec = new PropertyWithBoundaryKindOfPropertiesSpecification();
            var properties = await _propertyRepo.ListAsync(spec);
            var property = properties.Where(x => x.Id == id).FirstOrDefault();

            var kindOfProperties = property.KindOfProperties.Where(x => x.TaxDecOfRealPropertyId == id).ToList();

            foreach (var kindOfProperty in kindOfProperties)
            {
                var agriLands = await _agriRepo.ListAllAsync();
                if (kindOfProperty.AgriculturalLandId > 0)
                {
                    var agriLand = agriLands.Where(x => x.Id == kindOfProperty.AgriculturalLandId).FirstOrDefault();
                    if (kindOfProperty.ActualUse == agriLand.Name)
                    {
                        if (kindOfProperty.Classification.Contains("3rd class"))
                        {
                            kindOfProperty.MarketValueAgri = agriLand.ThirdClass;
                        }
                        else if (kindOfProperty.Classification.Contains("2nd class"))
                        {
                            kindOfProperty.MarketValueAgri = agriLand.SecondClass;
                        }
                        else if (kindOfProperty.Classification.Contains("1st class"))
                        {
                            kindOfProperty.MarketValueAgri = agriLand.FirstClass;
                        }
                    }
                }

                var commLands = await _commRepo.ListAllAsync();
                if (kindOfProperty.CommercialLandId > 0)
                {
                    var commLand = commLands.Where(x => x.Id == kindOfProperty.CommercialLandId).FirstOrDefault();
                    if (kindOfProperty.Classification == commLand.Name)
                    {
                        kindOfProperty.MarketValueComm = commLand.MarketValue;
                    }
                }

                var induLands = await _induRepo.ListAllAsync();
                if (kindOfProperty.IndustrialLandId > 0)
                {
                    var induLand = induLands.Where(x => x.Id == kindOfProperty.IndustrialLandId).FirstOrDefault();
                    if (kindOfProperty.Classification == induLand.Name)
                    {
                        kindOfProperty.MarketValueIndu = induLand.MarketValue;
                    }
                }

                var resiLands = await _resiRepo.ListAllAsync();
                if (kindOfProperty.ResidentialLandId > 0)
                {
                    var resiLand = resiLands.Where(x => x.Id == kindOfProperty.ResidentialLandId).FirstOrDefault();
                    if (kindOfProperty.Classification == resiLand.Name)
                    {
                        kindOfProperty.MarketValueResi = resiLand.MarketValue;
                    }
                }
            }

            return Ok(property);
        }

        [HttpGet("merge-years")]
        public async Task<ActionResult<IEnumerable<PropertyForYearsToReturnDto>>> GetPropertiesForMergeYears()
        {
            var years = await _propertyRepo.ListAllAsync();

            var mergeYears = years.GroupBy(x => new {x.Year})
                .Select(x => new PropertyForYearsToReturnDto(x.Key.Year))
                .ToList();

            var data = _mapper.Map<IEnumerable<PropertyForYearsToReturnDto>>(mergeYears);

            return Ok(data); 
        }

        [HttpGet("land")]
        public async Task<ActionResult<Land<LandPropertyToReturnDto>>> GetPropertiesWithLandYear(
            [FromQuery] LandPropertySpecParams landPropertySpecParams)
        {
            var spec = new LandPropertyWithRealPropertiesSpecification();

            var countSpec = new LandPropertyWithFiltersForCountSpecification();

            var totalItems = await _propertyRepo.CountAsync(countSpec);

            var properties = await _propertyRepo.ListAsync(spec);

            List<LandPropertyToReturnDto> newList = new List<LandPropertyToReturnDto>();
            List<TaxDecOfRealProperty> mergeListTD = new List<TaxDecOfRealProperty>();

            if (landPropertySpecParams.YearOne > 0 && landPropertySpecParams.YearTwo > 0)
            {
                var propYearOne = properties.Where(x => x.Year == landPropertySpecParams.YearOne).ToList();

                var propYearTwo = properties.Where(x => x.Year == landPropertySpecParams.YearTwo).ToList();

                mergeListTD = mergeListTD.Concat(propYearOne)
                                            .Concat(propYearTwo)
                                            .ToList();

                totalItems = mergeListTD.Count();
            }

            if (!string.IsNullOrEmpty(landPropertySpecParams.KindOfLand))
            {
                var newListTaxDec = mergeListTD.Where(x => x.KindOfProperties.Count() <= 1).Where(x => x.KindOfProperties.Any(x => x.KindOfLands == landPropertySpecParams.KindOfLand)).ToList();

                newList = newListTaxDec.GroupBy(x => new {x.Barangay})
                    .Select(x => new LandPropertyToReturnDto(x.Key.Barangay, x.Where(x => x.Year == landPropertySpecParams.YearOne).Sum(x => x.KindOfProperties.Sum(x => x.MarketValue)),
                            x.Where(x => x.Year == landPropertySpecParams.YearOne).Sum(x => x.KindOfProperties.Sum(x => x.AssessedValue)),
                            x.Where(x => x.Year == landPropertySpecParams.YearTwo).Sum(x => x.KindOfProperties.Sum(x => x.MarketValue)), x.Where(x => x.Year == landPropertySpecParams.YearOne).Sum(x => x.PreviousAssessedValue),
                            x.Where(x => x.Year == landPropertySpecParams.YearOne).Sum(x => x.KindOfProperties.Sum(x => x.Area)), x.Where(x => x.Year == landPropertySpecParams.YearOne).Count()))
                        .ToList();

                totalItems = newList.Count();
            }

            var data = _mapper.Map<IEnumerable<LandPropertyToReturnDto>>(newList);

            return Ok(new Land<LandPropertyToReturnDto>(totalItems, data));
        }

        [HttpGet("lands/mixuse")]
        public async Task<ActionResult<Land<LandPropertyMixUseToReturnDto>>> GetPropertiesWithLandsMixUse()
        {
            var spec = new LandPropertyWithRealPropertiesSpecification();

            var countSpec = new LandPropertyWithFiltersForCountSpecification();

            var totalItems = await _propertyRepo.CountAsync(countSpec);

            var properties = await _propertyRepo.ListAsync(spec);

            properties = properties.Where(x => x.KindOfProperties.Count() > 1).ToList();

            totalItems = properties.Count();

            var data = _mapper.Map<IEnumerable<LandPropertyMixUseToReturnDto>>(properties);

            return Ok(new Land<LandPropertyMixUseToReturnDto>(totalItems, data));
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

        [HttpPost("kindOfProperties/{id}")]
        public async Task<ActionResult<List<KindOfPropertyToCreateDto>>> CreateKindOfProperties(List<KindOfPropertyToCreateDto> kindOfPropertiesToCreateDto, int id)
        {
            var kindOfProperties = new List<KindOfProperty>();

            kindOfPropertiesToCreateDto.ForEach(kindOfPropertyToCreateDto => {
                kindOfProperties.Add(new KindOfProperty()
                {
                    KindOfLands = kindOfPropertyToCreateDto.KindOfLands,
                    Classification = kindOfPropertyToCreateDto.Classification,
                    Area = kindOfPropertyToCreateDto.Area,
                    MarketValue = kindOfPropertyToCreateDto.MarketValue,
                    ActualUse = kindOfPropertyToCreateDto.ActualUse,
                    Level = kindOfPropertyToCreateDto.Level,
                    AssessedValue = kindOfPropertyToCreateDto.AssessedValue,
                    AgriculturalLandId = kindOfPropertyToCreateDto.AgriculturalLandId,
                    CommercialLandId = kindOfPropertyToCreateDto.CommercialLandId,
                    IndustrialLandId = kindOfPropertyToCreateDto.IndustrialLandId,
                    ResidentialLandId = kindOfPropertyToCreateDto.ResidentialLandId,
                    TaxDecOfRealPropertyId = id
                });
            });

            kindOfProperties.ForEach(kindOfProperty => {
                _kindOfPropertyRepo.Add(kindOfProperty);
            });

            if (await _kindOfPropertyRepo.SaveAll())
                return Ok(_mapper.Map<List<KindOfPropertyToCreateDto>>(kindOfProperties));

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
    }
}