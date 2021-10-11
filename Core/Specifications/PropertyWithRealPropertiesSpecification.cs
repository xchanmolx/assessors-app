using System.Linq;
using Core.Entities;

namespace Core.Specifications
{
    public class PropertyWithRealPropertiesSpecification : BaseSpecification<TaxDecOfRealProperty>
    {
        public PropertyWithRealPropertiesSpecification(PropertySpecParams propertyParams)
            : base(x =>
                (string.IsNullOrEmpty(propertyParams.Search) || x.OwnerName.ToLower()
                    .Contains(propertyParams.Search) || x.TaxDecNumber.ToLower().Contains(propertyParams.Search)
                    || x.SurveyLotNumber.ToLower().Contains(propertyParams.Search))
            )
        {
            AddOrderBy(x => x.OwnerName);
            ApplyPaging(propertyParams.PageSize * (propertyParams.PageIndex - 1), 
                propertyParams.PageSize);

            if (!string.IsNullOrEmpty(propertyParams.Sort))
            {
                switch (propertyParams.Sort)
                {
                    case "yearAsc":
                        AddOrderBy(y => y.EffectiveYear);
                        break;
                    case "yearDesc":
                        AddOrderByDescending(y => y.EffectiveYear);
                        break;
                    default:
                        AddOrderBy(x => x.OwnerName);
                        break;
                }
            }
        }

        public PropertyWithRealPropertiesSpecification(int id) 
            : base(x => x.Id == id)
        {
            AddInclude(p => p.Photos);
        }
    }
}