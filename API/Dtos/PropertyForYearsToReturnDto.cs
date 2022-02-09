using System;
using System.Collections.Generic;
using Core.Entities;

namespace API.Dtos
{
    public class PropertyForYearsToReturnDto
    {
        public PropertyForYearsToReturnDto(int year)
        {
            Year = year;
        }

        public int Year { get; set; }
    }
}