namespace Core.Entities
{
    public class Boundary : BaseEntity
    {
        public string North { get; set; }
        public string East { get; set; }
        public string South { get; set; }
        public string West { get; set; }
        public TaxDecOfRealProperty TaxDecOfRealProperty { get; set; }
        public int TaxDecOfRealPropertyId { get; set; }
    }
}