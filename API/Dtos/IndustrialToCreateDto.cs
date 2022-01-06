using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class IndustrialToCreateDto
    {
        [Required]
        public string Name { get; set; }

        [Required(ErrorMessage = "Market value field is required.")]
        public decimal MarketValue { get; set; }
    }
}