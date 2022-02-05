using System;
using System.Collections.Generic;
using Core.Entities;

namespace API.Dtos
{
    public class LandPropertyToReturnDto
    {
        public LandPropertyToReturnDto(string propertyLocation, decimal previousAssessedValue)
        {
            PropertyLocation = propertyLocation;
            PreviousAssessedValue = previousAssessedValue;
        }

        // public int Id { get; set; }
        // public string TdNo { get; set; }
        // public string Owner { get; set; }
        public string PropertyLocation { get; set; }
        // public List<KindOfPropertyForListDto> KindOfProperties { get; set; }
        // public string TaxableExempt { get; set; }
        // public int Year { get; set; }
        // public string DeclarationCancels { get; set; }
        public decimal PreviousAssessedValue { get; set; }
    }
}