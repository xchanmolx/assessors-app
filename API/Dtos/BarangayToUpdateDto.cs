using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class BarangayToUpdateDto
    {
        [Required]
        public string Name { get; set; }
    }
}