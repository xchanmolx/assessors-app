using Core.Entities;

namespace Core.Specifications
{
    public class PropertyWithBoundaryKindOfPropertiesSpecification : BaseSpecification<TaxDecOfRealProperty>
    {
        public PropertyWithBoundaryKindOfPropertiesSpecification()
        {
            AddInclude(x => x.Boundary);
            AddInclude(x => x.KindOfProperties);
        }
    }
}