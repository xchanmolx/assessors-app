using System.Collections.Generic;
using Core.Entities;

namespace API.Dtos
{
    public class PropertyToTraceDto
    {
        public int Id { get; set; }
        public string TdNo { get; set; }
        public string Owner { get; set; }
        public string Barangay { get; set; }
        public string SurveyLotNo { get; set; }
        public int Year { get; set; }
        public List<KindOfPropertyForAreaDto> KindOfProperties { get; set; }
        public string Memoranda { get; set; }
    }
}