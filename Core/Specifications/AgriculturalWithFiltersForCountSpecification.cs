using Core.Entities;

namespace Core.Specifications
{
    public class AgriculturalWithFiltersForCountSpecification : BaseSpecification<AgriculturalLand>
    {
        public AgriculturalWithFiltersForCountSpecification(KindOfLandsSpecParams agriculturalSpecParams)
            :base(x => 
                (string.IsNullOrEmpty(agriculturalSpecParams.Search) || x.Name.ToLower().Contains(agriculturalSpecParams.Search)))
        {
        }
    }
}