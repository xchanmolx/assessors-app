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
        public PhotosController(IGenericRepository<Photo> photoRepo, IMapper mapper, IHostEnvironment hostEnvironment)
        {
            _photoRepo = photoRepo;
            _mapper = mapper;
            _hostEnvironment = hostEnvironment;
        }

        [HttpPost]
        public async Task<ActionResult<List<PhotoForCreationDto>>> CreatePhotos([Required] List<IFormFile> formFiles, [Required] string subDirectory, [Required] int taxDecId)
        {
            var photoForCreationDtos = new List<PhotoForCreationDto>();
            var photos = _mapper.Map<List<Photo>>(photoForCreationDtos);

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
                return Ok(photos);

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
    }
}