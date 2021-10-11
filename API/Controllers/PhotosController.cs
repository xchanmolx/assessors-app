using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.IO;
using System.Threading.Tasks;
using API.Dtos;
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
        public async Task<ActionResult> CreatePhoto([Required] List<IFormFile> formFiles, [Required] string subDirectory, [Required] int TaxDecId)
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
                    TaxDecOfRealPropertyId = TaxDecId
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
    }
}