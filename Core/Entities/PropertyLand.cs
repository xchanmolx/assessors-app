namespace Core.Entities
{
    public class PropertyLand : BaseEntity
    {
        public TaxDecOfRealProperty TaxDecOfRealProperty { get; set; }
        public int? TaxDecOfRealPropertyId { get; set; }
        public AgriculturalLand AgriculturalLand { get; set; }
        public int? AgriculturalLandId { get; set; }
        public CommercialLand CommercialLand { get; set; }
        public int? CommercialLandId { get; set; }
        public IndustrialLand IndustrialLand { get; set; }
        public int? IndustrialLandId { get; set; }
        public ResidentialLand ResidentialLand { get; set; }
        public int? ResidentialLandId { get; set; }
    }
}