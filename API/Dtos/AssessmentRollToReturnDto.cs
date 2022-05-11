using System;
using System.Collections.Generic;

namespace API.Dtos
{
    public class AssessmentRollToReturnDto
    {
        public int Id { get; set; }
        public string TdNo { get; set; }
        public string Owner { get; set; }
        public string Address { get; set; }
        public string Barangay { get; set; }
        public string PropertyIdentificationNo { get; set; }
        public string ArpNo { get; set; }
        public string KindOfPropertyAssessed { get; set; }
        public List<KindOfPropertyForAssessmentRollDto> KindOfProperties { get; set; }
        public string DeclarationCancels { get; set; }
        public decimal PreviousAssessedValue { get; set; }
        public int Year { get; set; }
    }
}