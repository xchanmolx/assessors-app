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
        public decimal MarketValueAgri { get; set; }
        public int AgriculturalLandId { get; set; }
        public decimal MarketValueComm { get; set; }
        public int CommercialLandId { get; set; }
        public decimal MarketValueIndu { get; set; }
        public int IndustrialLandId { get; set; }
        public decimal MarketValueResi { get; set; }
        public int ResidentialLandId { get; set; }
    }
}