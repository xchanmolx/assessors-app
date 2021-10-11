using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Core.Entities;
using Microsoft.AspNetCore.Http;

namespace API.Dtos
{
    public class PhotoForCreationDto
    {
        // [Required(ErrorMessage = "The picture URL is required.")]
        public string Url { get; set; }

        [Required(ErrorMessage = "The tax declaration property ID is required.")]
        public int TaxDecOfRealPropertyId { get; set; }
    }
}