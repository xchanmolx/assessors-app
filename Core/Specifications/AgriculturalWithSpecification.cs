using Core.Entities;

namespace Core.Specifications
{
    public class AgriculturalWithSpecification : BaseSpecification<AgriculturalLand>
    {
        public AgriculturalWithSpecification(KindOfLandsSpecParams agriculturalSpecParams)
            :base(x => 
                (string.IsNullOrEmpty(agriculturalSpecParams.Search) || x.Name.ToLower().Contains(agriculturalSpecParams.Search)))
        {
            AddOrderBy(x => x.Name);
        }
    }
}