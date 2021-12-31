using Core.Entities;

namespace Core.Specifications
{
    public class CommercialWithFiltersForCountSpecification : BaseSpecification<CommercialLand>
    {
        public CommercialWithFiltersForCountSpecification(KindOfLandsSpecParams commercialSpecParams)
            :base(x => 
                (string.IsNullOrEmpty(commercialSpecParams.Search) || x.Name.ToLower().Contains(commercialSpecParams.Search)))
        {
        }
    }
}