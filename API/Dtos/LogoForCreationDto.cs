using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class LogoForCreationDto
    {
        [Required]
        public string Url { get; set; }

        private string _ordinal;
        [Required]
        public string Ordinal
        {
            get { return _ordinal; }
            set { _ordinal = value.ToLower(); }
        }
        
    }
}