using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class AgriculturalToUpdateDto
    {
        [Required]
        public string Name { get; set; }

        [Required(ErrorMessage = "First class field is required.")]
        public decimal FirstClass { get; set; }

        [Required(ErrorMessage = "Second class field is required.")]
        public decimal SecondClass { get; set; }

        [Required(ErrorMessage = "Third class field is required.")]
        public decimal ThirdClass { get; set; }
    }
}