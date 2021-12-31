using Core.Entities;

namespace Core.Specifications
{
    public class IndustrialWithSpecification : BaseSpecification<IndustrialLand>
    {
        public IndustrialWithSpecification(KindOfLandsSpecParams industrialSpecParams)
            :base(x => 
                (string.IsNullOrEmpty(industrialSpecParams.Search) || x.Name.ToLower().Contains(industrialSpecParams.Search)))
        {
            AddOrderBy(x => x.Name);
        }
    }
}