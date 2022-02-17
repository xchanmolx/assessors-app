using System;
using System.Collections.Generic;
using Core.Entities;

namespace API.Dtos
{
    public class LandPropertyToReturnDto
    {
        public LandPropertyToReturnDto(string propertyLocation, decimal currentMarketValue, decimal currentAssessedValue,
            decimal previousMarketValue, decimal previousAssessedValue, double area, int rpus)
        {
            PropertyLocation = propertyLocation;
            CurrentMarketValue = currentMarketValue;
            CurrentAssessedValue = currentAssessedValue;

            PreviousMarketValue = previousMarketValue;

            PreviousAssessedValue = previousAssessedValue;
            Area = area;
            Rpus = rpus;
        }
        
        public string PropertyLocation { get; set; }
        public decimal CurrentMarketValue { get; set; }
        public decimal CurrentAssessedValue { get; set; }

        public decimal PreviousMarketValue { get; set; }

        public decimal PreviousAssessedValue { get; set; }
        public double Area { get; set; }
        public int Rpus { get; set; }
    }
}