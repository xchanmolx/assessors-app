namespace Core.Entities
{
    public class KindOfProperty : BaseEntity
    {
        public string Classification { get; set; }
        public double Area { get; set; }
        public decimal MarketValue { get; set; }
        public string ActualUse { get; set; }
        public double Level { get; set; }
        public decimal AssessedValue { get; set; }
        public TaxDecOfRealProperty TaxDecOfRealProperty { get; set; }
        public int TaxDecOfRealPropertyId { get; set; }
    }
}