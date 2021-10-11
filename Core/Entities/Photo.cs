namespace Core.Entities
{
    public class Photo : BaseEntity
    {
        public string Url { get; set; }
        public TaxDecOfRealProperty TaxDecOfRealProperty { get; set; }
        public int TaxDecOfRealPropertyId { get; set; }
    }
}