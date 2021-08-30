using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class PropertyToUpdateDto
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

        [Required(ErrorMessage = "The photo upload is required.")]
        public string PictureUrl { get; set; }
    }
}