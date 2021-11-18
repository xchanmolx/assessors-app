using Core.Entities;

namespace Core.Specifications
{
    public class PropertyWithKindOfPropertiesSpecification : BaseSpecification<TaxDecOfRealProperty>
    {
        public PropertyWithKindOfPropertiesSpecification()
        {
            AddInclude(x => x.KindOfProperties);
        }
    }
}