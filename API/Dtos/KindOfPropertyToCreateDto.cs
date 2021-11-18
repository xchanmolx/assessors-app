using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class KindOfPropertyToCreateDto
    {
        [Required]
        public string Classification { get; set; }

        [Required]
        public double Area { get; set; }

        [Required(ErrorMessage = "The market value field is required.")]
        public decimal MarketValue { get; set; }

        [Required(ErrorMessage = "The actual use field is required.")]
        public string ActualUse { get; set; }

        [Required]
        public double Level { get; set; }

        [Required(ErrorMessage = "The assessed value field is required.")]
        public decimal AssessedValue { get; set; }
        public int TaxDecOfRealPropertyId { get; set; }
    }
}