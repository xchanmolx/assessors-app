using Core.Entities;

namespace Core.Specifications
{
    public class PropertyWithFiltersForCountSpecification : BaseSpecification<TaxDecOfRealProperty>
    {
        public PropertyWithFiltersForCountSpecification(PropertySpecParams propertyParams)
            : base(x =>
                (string.IsNullOrEmpty(propertyParams.Search) || x.Owner.ToLower()
                    .Contains(propertyParams.Search) || x.TdNo.ToLower().Contains(propertyParams.Search)
                    || x.SurveyLotNo.ToLower().Contains(propertyParams.Search))
            )
        {
        }
    }
}