using Core.Entities;

namespace Core.Specifications
{
    public class PropertyWithRealPropertiesSpecification : BaseSpecification<TaxDecOfRealProperty>
    {
        public PropertyWithRealPropertiesSpecification(PropertySpecParams propertyParams)
            : base(x =>
                (string.IsNullOrEmpty(propertyParams.Search) || x.Owner.ToLower()
                    .Contains(propertyParams.Search) || x.TdNo.ToLower().Contains(propertyParams.Search)
                    || x.SurveyLotNo.ToLower().Contains(propertyParams.Search))
            )
        {
            AddInclude(x => x.Boundary);
            AddInclude(x => x.KindOfProperties);
            AddOrderBy(x => x.Owner);
            ApplyPaging(propertyParams.PageSize * (propertyParams.PageIndex - 1), 
                propertyParams.PageSize);

            if (!string.IsNullOrEmpty(propertyParams.Sort))
            {
                switch (propertyParams.Sort)
                {
                    case "yearAsc":
                        AddOrderBy(x => x.Year);
                        break;
                    case "yearDesc":
                        AddOrderByDescending(x => x.Year);
                        break;
                    default:
                        AddOrderBy(x => x.Owner);
                        break;
                }
            }
        }

        public PropertyWithRealPropertiesSpecification(int id) 
            : base(x => x.Id == id)
        {
        }
    }
}