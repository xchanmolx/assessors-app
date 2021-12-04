using Core.Entities;

namespace Core.Specifications
{
    public class IndustrialOrderByNameSpecification : BaseSpecification<IndustrialLand>
    {
        public IndustrialOrderByNameSpecification()
        {
            AddOrderBy(x => x.Name);
        }
    }
}