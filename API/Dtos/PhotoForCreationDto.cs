using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Core.Entities;
using Microsoft.AspNetCore.Http;

namespace API.Dtos
{
    public class PhotoForCreationDto
    {
        [Required]
        public string Url { get; set; }
        public int TaxDecOfRealPropertyId { get; set; }
    }
}