using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class AppUserDto
    {

        [Required(ErrorMessage = "The first name field is required.")]
        public string FirstName { get; set; }

        [Required(ErrorMessage = "The last name field is required.")]
        public string LastName { get; set; }

        [Required]
        public string Gender { get; set; }

        [Required(ErrorMessage = "The phone number field is required.")]
        public string PhoneNumber { get; set; }

        [Required]
        public string Address { get; set; }
    }
}