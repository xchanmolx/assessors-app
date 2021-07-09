using Core.Entities;

namespace Core.Specifications
{
    public class PropertyWithFiltersForCountSpecification : BaseSpecification<TaxDecOfRealProperty>
    {
        public PropertyWithFiltersForCountSpecification(PropertySpecParams propertyParams)
            : base(x =>
                (string.IsNullOrEmpty(propertyParams.Search) || x.OwnerName.ToLower()
                    .Contains(propertyParams.Search) || x.TaxDecNumber.ToLower().Contains(propertyParams.Search)
                    || x.SurveyLotNumber.ToLower().Contains(propertyParams.Search))
            )
        {
        }
    }
}