using Core.Entities;

namespace Core.Specifications
{
    public class ResidentialWithSpecification : BaseSpecification<ResidentialLand>
    {
        public ResidentialWithSpecification(KindOfLandsSpecParams residentialSpecParams)
            :base(x => 
                (string.IsNullOrEmpty(residentialSpecParams.Search) || x.Name.ToLower().Contains(residentialSpecParams.Search)))
        {
            AddOrderBy(x => x.Name);
        }
    }
}