using System.Collections.Generic;
using Microsoft.AspNetCore.Http;

namespace Core.Interfaces
{
    public interface IFileService
    {
        void UploadFile(List<IFormFile> files, string subDirectory);
        (string fileType, byte[] archiveData, string archiveName) DownloadFiles(string subDirectory);  
        string SizeConverter(long bytes);
    }
}