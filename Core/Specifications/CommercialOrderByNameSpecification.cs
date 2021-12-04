using Core.Entities;

namespace Core.Specifications
{
    public class CommercialOrderByNameSpecification : BaseSpecification<CommercialLand>
    {
        public CommercialOrderByNameSpecification()
        {
            AddOrderBy(x => x.Name);
        }
    }
}