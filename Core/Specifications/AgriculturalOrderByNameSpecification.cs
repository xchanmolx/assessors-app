using Core.Entities;

namespace Core.Specifications
{
    public class AgriculturalOrderByNameSpecification : BaseSpecification<AgriculturalLand>
    {
        public AgriculturalOrderByNameSpecification()
        {
            AddOrderBy(x => x.Name);
        }
    }
}