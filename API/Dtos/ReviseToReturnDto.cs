using System;
using System.Collections.Generic;
using Core.Entities;

namespace API.Dtos
{
    public class ReviseToReturnDto
    {
        public int Id { get; set; }
        public string TdNo { get; set; }
        public string Owner { get; set; }
        public string Address { get; set; }
        public string Barangay { get; set; }
        public string SurveyLotNo { get; set; }
        public int Year { get; set; }
    }
}