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
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    // [Authorize]
    public class RealPropertiesController : BaseApiController
    {
        private readonly IGenericRepository<TaxDecOfRealProperty> _propertyRepo;
        private readonly IMapper _mapper;
        private readonly IWebHostEnvironment _hostEnvironment;
        public RealPropertiesController(IGenericRepository<TaxDecOfRealProperty> propertyRepo, IMapper mapper,
            IWebHostEnvironment hostEnvironment)
        {
            _hostEnvironment = hostEnvironment;
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

        [HttpPost]
        public async Task<ActionResult<PropertyToCreateDto>> CreateProperty(PropertyToCreateDto propertyToCreateDto)
        {
            var property = new TaxDecOfRealProperty 
            {
                OwnerName = propertyToCreateDto.OwnerName,
                PropertyLocation = propertyToCreateDto.PropertyLocation,
                TaxDecNumber = propertyToCreateDto.TaxDecNumber,
                EffectiveYear = propertyToCreateDto.EffectiveYear,
                SurveyLotNumber = propertyToCreateDto.SurveyLotNumber,
                LandArea = propertyToCreateDto.LandArea,
                PictureUrl = propertyToCreateDto.PictureUrl,
                Remarks = propertyToCreateDto.Remarks
            };

            _propertyRepo.Add(property);
            
            if (await _propertyRepo.SaveAll())
                return Ok(property);

            return BadRequest(new ApiResponse(400));
        }

        [HttpPost("upload")]
        public async Task<ActionResult> UploadPhoto(IFormFile image)
        {
            if (image != null)
            {
                var fileName = Path.GetFileName(image.FileName);
                Guid guid = Guid.NewGuid();
                fileName = (guid.ToString() + fileName);
                var filePath = Path.Combine(_hostEnvironment.WebRootPath, @"images\properties", fileName);
                var imagePath = $"images/properties/{fileName}";

                using (var fileStream = new FileStream(filePath, FileMode.Create))
                {
                    await image.CopyToAsync(fileStream);
                }

                return Ok(new {
                    imagePath = imagePath,
                    imageUploadSuccess = "Photo successfully uploaded"
                });
            }
            else
            {
                return BadRequest(new ApiResponse(400));
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProperty(int id)
        {
            var propertyFromRepo = await _propertyRepo.GetByIdAsync(id);

            if (propertyFromRepo.Id > 0)
            {
                _propertyRepo.Delete(propertyFromRepo);
            }

            if (await _propertyRepo.SaveAll())
                return Ok();

            return BadRequest(new ApiResponse(400));
        }
    }
}