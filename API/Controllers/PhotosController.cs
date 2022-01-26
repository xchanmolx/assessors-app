using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Threading.Tasks;
using API.Dtos;
using API.Errors;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace API.Controllers
{
    public class PhotosController : BaseApiController
    {
        private readonly IGenericRepository<Photo> _photoRepo;
        private readonly IMapper _mapper;
        private readonly IHostEnvironment _hostEnvironment;
        private readonly IGenericRepository<Logo> _logoRepo;
        public PhotosController(IGenericRepository<Photo> photoRepo, IMapper mapper, IHostEnvironment hostEnvironment,
            IGenericRepository<Logo> logoRepo)
        {
            _photoRepo = photoRepo;
            _mapper = mapper;
            _hostEnvironment = hostEnvironment;
            _logoRepo = logoRepo;
        }

        [HttpPost]
        public async Task<ActionResult<List<PhotoForCreationDto>>> CreatePhotos([Required] List<IFormFile> formFiles, [Required] string subDirectory, [Required] int taxDecId)
        {
            var photos = new List<Photo>();

            subDirectory = subDirectory ?? string.Empty;
            var target = Path.Combine(_hostEnvironment.ContentRootPath, subDirectory);

            Directory.CreateDirectory(target);

            formFiles.ForEach(file =>
            {
                if (file.Length <= 0) return;

                var fileName = Path.GetFileName(file.FileName);
                Guid guid = Guid.NewGuid();
                fileName = (guid.ToString() + "_" + fileName);

                var filePath = Path.Combine(target, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                photos.Add(new Photo()
                {
                    Url = (subDirectory + fileName),
                    TaxDecOfRealPropertyId = taxDecId
                });
            });

            photos.ForEach(photo =>
            {
                _photoRepo.Add(photo);
            });

            if (await _photoRepo.SaveAll())
                return Ok(_mapper.Map<List<PhotoForCreationDto>>(photos));

            return BadRequest();
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<PhotoToDeleteDto>> DeletePhoto(int id, string subDirectory)
        {
            subDirectory = subDirectory ?? string.Empty;
            string[] picList = Directory.GetFiles(subDirectory);

            var photoFromRepo = await _photoRepo.GetByIdAsync(id);

            if (photoFromRepo.Id > 0)
            {
                _photoRepo.Delete(photoFromRepo);

                foreach (var pic in picList)
                {
                    if (pic == photoFromRepo.Url)
                    {
                        System.IO.File.Delete(pic);
                    }
                }
            }

            if (await _photoRepo.SaveAll())
                return Ok(_mapper.Map<PhotoToDeleteDto>(photoFromRepo));

            return BadRequest(new ApiResponse(400));
        }

        [HttpGet("logos")]
        public async Task<ActionResult<IEnumerable<LogoForDetailsDto>>> GetLogos()
        {
            var logos = await _logoRepo.ListAllAsync();

            var logosMap = _mapper.Map<IEnumerable<LogoForDetailsDto>>(logos);

            return Ok(logosMap);
        }

        [HttpPost("logo")]
        public async Task<ActionResult<List<LogoForCreationDto>>> CreateLogo([Required] List<IFormFile> formFiles, [Required] string subDirectory, [Required] string ordinal)
        {
            var logos = new List<Logo>();

            subDirectory = subDirectory ?? string.Empty;
            var target = Path.Combine(_hostEnvironment.ContentRootPath, subDirectory);

            Directory.CreateDirectory(target);

            formFiles.ForEach(file =>
            {
                if (file.Length <= 0) return;

                var fileName = Path.GetFileName(file.FileName);
                Guid guid = Guid.NewGuid();
                fileName = (guid.ToString() + "_" + fileName);

                var filePath = Path.Combine(target, fileName);

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    file.CopyTo(stream);
                }

                logos.Add(new Logo()
                {
                    Url = (subDirectory + fileName),
                    Ordinal = ordinal.ToLower()
                });
            });

            logos.ForEach(logo =>
            {
                _logoRepo.Add(logo);
            });

            if (await _logoRepo.SaveAll())
                return Ok(_mapper.Map<List<LogoForCreationDto>>(logos));

            return BadRequest();
        }

        [HttpDelete("logo/{id}")]
        public async Task<ActionResult<LogoToDeleteDto>> DeleteLogo(int id, string subDirectory)
        {
            subDirectory = subDirectory ?? string.Empty;
            string[] logos = Directory.GetFiles(subDirectory);

            var logoFromRepo = await _logoRepo.GetByIdAsync(id);

            if (logoFromRepo.Id > 0)
            {
                _logoRepo.Delete(logoFromRepo);

                foreach (var logo in logos)
                {
                    if (logo == logoFromRepo.Url)
                    {
                        System.IO.File.Delete(logo);
                    }
                }
            }

            if (await _logoRepo.SaveAll())
                return Ok(_mapper.Map<LogoToDeleteDto>(logoFromRepo));

            return BadRequest(new ApiResponse(400));
        }
    }
}