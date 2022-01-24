using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class ProvinceToCreateDto
    {
        [Required]
        public string Name { get; set; }
    }
}