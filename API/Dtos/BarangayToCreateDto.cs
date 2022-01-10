using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class BarangayToCreateDto
    {
        [Required]
        public string Name { get; set; }
    }
}