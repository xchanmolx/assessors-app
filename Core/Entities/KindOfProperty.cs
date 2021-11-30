namespace Core.Entities
{
    public class KindOfProperty : BaseEntity
    {
        public string KindOfLands { get; set; }
        public string Classification { get; set; }
        public double Area { get; set; }
        public decimal MarketValue { get; set; }
        public string ActualUse { get; set; }
        public double Level { get; set; }
        public decimal AssessedValue { get; set; }
        public TaxDecOfRealProperty TaxDecOfRealProperty { get; set; }
        public int TaxDecOfRealPropertyId { get; set; }
        public decimal? MarketValueAgri { get; set; } = 0;
        public int? AgriculturalLandId { get; set; }
        public decimal? MarketValueComm { get; set; } = 0;
        public int? CommercialLandId { get; set; }
        public decimal? MarketValueIndu { get; set; } = 0;
        public int? IndustrialLandId { get; set; }
        public decimal? MarketValueResi { get; set; } = 0;
        public int? ResidentialLandId { get; set; }
    }
}