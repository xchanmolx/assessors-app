using System.Collections.Generic;
using Core.Entities;

namespace API.Dtos
{
    public class LandPropertyMixUseToReturnDto
    {
        public string TdNo { get; set; }
        public string PropertyLocation { get; set; }
        public ICollection<KindOfPropertyMixUseForListDto> KindOfProperties { get; set; }
        public decimal PreviousAssessedValue { get; set; }
        public int Year { get; set; }
    }
}