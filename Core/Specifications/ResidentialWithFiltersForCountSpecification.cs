using Core.Entities;

namespace Core.Specifications
{
    public class ResidentialWithFiltersForCountSpecification : BaseSpecification<ResidentialLand>
    {
        public ResidentialWithFiltersForCountSpecification(KindOfLandsSpecParams residentialSpecParams)
            :base(x => 
                (string.IsNullOrEmpty(residentialSpecParams.Search) || x.Name.ToLower().Contains(residentialSpecParams.Search)))
        {
        }
    }
}