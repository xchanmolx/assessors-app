using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class StaffToCreateDto
    {
        [Required]
        public string Name { get; set; }

        private string _gender;
        [Required]
        public string Gender
        {
            get => _gender; 
            set => _gender = value.ToLower();
        }

        [Required]
        public string Address { get; set; }

        [Required]
        public string Contact { get; set; }

        [Required]
        public string Designation { get; set; }
    }
}