using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using AutoMapper;
using Core.Entities;
using Core.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Hosting;

namespace API.Controllers
{
    public class FileController : BaseApiController
    {
        private readonly IFileService _fileService;
        private readonly IGenericRepository<Photo> _photoRepo;
        private readonly IMapper _mapper;
        private readonly IHostEnvironment _hostEnvironment;
        public FileController(IFileService fileService,
        IGenericRepository<Photo> photoRepo, IMapper mapper, IHostEnvironment hostEnvironment)
        {
            _fileService = fileService;
            _photoRepo = photoRepo;
            _mapper = mapper;
            _hostEnvironment = hostEnvironment;
        }

    #region Upload  
    [HttpPost(nameof(Upload))]
    public IActionResult Upload([Required] List<IFormFile> formFiles, [Required] string subDirectory)
    {
        try
        {
            _fileService.UploadFile(formFiles, subDirectory);

            return Ok(new { formFiles.Count, Size = _fileService.SizeConverter(formFiles.Sum(f => f.Length)) });
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    #endregion

    #region Download File  
    [HttpGet(nameof(Download))]
    public IActionResult Download([Required] string subDirectory)
    {
        try
        {
            var (fileType, archiveData, archiveName) = _fileService.DownloadFiles(subDirectory);

            return File(archiveData, fileType, archiveName);
        }
        catch (Exception ex)
        {
            return BadRequest(ex.Message);
        }
    }
    #endregion
}
}