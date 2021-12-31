using Core.Entities;

namespace Core.Specifications
{
    public class CommercialWithSpecification : BaseSpecification<CommercialLand>
    {
        public CommercialWithSpecification(KindOfLandsSpecParams commercialSpecParams)
            :base(x => 
                (string.IsNullOrEmpty(commercialSpecParams.Search) || x.Name.ToLower().Contains(commercialSpecParams.Search)))
        {
            AddOrderBy(x => x.Name);
        }
    }
}