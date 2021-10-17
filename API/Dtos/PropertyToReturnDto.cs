using System.Collections.Generic;

namespace API.Dtos
{
    public class PropertyToReturnDto
    {
        public int Id { get; set; }
        public string TaxDecNumber { get; set; }
        public string OwnerName { get; set; }
        public string OwnerAddress { get; set; }
        public string PropertyLocation { get; set; }
        public string SurveyLotNumber { get; set; }
        public double LandArea { get; set; }
        public int EffectiveYear { get; set; }
        public string PropertyIndex { get; set; }
        public string ARPNumber { get; set; }
        public string Kind { get; set; }
        public string Class { get; set; }
        public decimal AssessedValue { get; set; }
        public string PreviousTDNumber { get; set; }
        public decimal PreviousAV { get; set; }
        public string TaxableExempt { get; set; }
        public string Remarks { get; set; }
    }
}