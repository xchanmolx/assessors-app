using System.ComponentModel.DataAnnotations;

namespace API.Dtos
{
    public class MunicipalityCityDistrictToUpdateDto
    {
        [Required]
        public string Name { get; set; }

        private string _level;
        [Required]
        public string Level
        {
            get { return _level; }
            set { _level = value.ToLower(); }
        }
    }
}