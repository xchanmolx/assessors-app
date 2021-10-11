using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Http;

namespace API.Dtos
{
    public class PropertyToCreateDto
    {
        [Required(ErrorMessage = "The owner name field is required.")]
        public string OwnerName { get; set; }

        [Required(ErrorMessage = "The tax declaration number field is required.")]
        public string TaxDecNumber { get; set; }

        [Required(ErrorMessage = "The survey lot number field is required.")]
        public string SurveyLotNumber { get; set; }

        [Required(ErrorMessage = "The property location field is required.")]
        public string PropertyLocation { get; set; }

        [Required(ErrorMessage = "The effective year field is required.")]
        public int EffectiveYear { get; set; }

        [Required(ErrorMessage = "The land area field is required.")]
        public double LandArea { get; set; }
        public string Remarks { get; set; }

        [Required(ErrorMessage = "The property index is required.")]
        public string PropertyIndex { get; set; }

        [Required(ErrorMessage = "The ARP number is required.")]
        public string ARPNumber { get; set; }

        [Required(ErrorMessage = "The owner's address is required.")]
        public string OwnerAddress { get; set; }

        [Required(ErrorMessage = "The kind is required.")]
        public string Kind { get; set; }

        [Required(ErrorMessage = "The class is required.")]
        public string Class { get; set; }

        [Required(ErrorMessage = "The assessed value is required.")]
        public decimal AssessedValue { get; set; }

        [Required(ErrorMessage = "The previous tax declaration number is required.")]
        public string PreviousTDNumber { get; set; }

        [Required(ErrorMessage = "The previous A.V. is required.")]
        public decimal PreviousAV { get; set; }
        public string TaxableExempt { get; set; }
    }
}