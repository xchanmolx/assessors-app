using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class ProvinceToUpdateDto
    {
        [Required]
        public string Name { get; set; }
    }
}