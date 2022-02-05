using Core.Entities;

namespace Core.Specifications
{
    public class LandPropertyWithRealPropertiesSpecification : BaseSpecification<TaxDecOfRealProperty>
    {
        public LandPropertyWithRealPropertiesSpecification()
        {
            AddInclude(x => x.KindOfProperties);
            AddOrderBy(x => x.PropertyLocation);
        }
    }
}