using Core.Entities;

namespace Core.Specifications
{
    public class PropertyLandSpecification : BaseSpecification<PropertyLand>
    {
        public PropertyLandSpecification()
        {
            AddInclude(x => x.TaxDecOfRealProperty);
            AddInclude(x => x.AgriculturalLand);
            AddInclude(x => x.CommercialLand);
            AddInclude(x => x.IndustrialLand);
            AddInclude(x => x.ResidentialLand);
        }
    }
}