using Core.Entities;

namespace Core.Specifications
{
    public class IndustrialWithFiltersForCountSpecification : BaseSpecification<IndustrialLand>
    {
        public IndustrialWithFiltersForCountSpecification(KindOfLandsSpecParams industrialSpecParams)
            :base(x => 
                (string.IsNullOrEmpty(industrialSpecParams.Search) || x.Name.ToLower().Contains(industrialSpecParams.Search)))
        {
        }
    }
}