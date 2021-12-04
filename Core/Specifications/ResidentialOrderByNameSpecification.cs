using Core.Entities;

namespace Core.Specifications
{
    public class ResidentialOrderByNameSpecification : BaseSpecification<ResidentialLand>
    {
        public ResidentialOrderByNameSpecification()
        {
            AddOrderBy(x => x.Name);
        }
    }
}