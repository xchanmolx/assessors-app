using Core.Entities;

namespace Core.Specifications
{
    public class AssessmentRollPropertyWithRealPropertiesSpecification : BaseSpecification<TaxDecOfRealProperty>
    {
        public AssessmentRollPropertyWithRealPropertiesSpecification()
        {
            AddInclude(x => x.Boundary);
            AddInclude(x => x.KindOfProperties);
            AddOrderBy(x => x.Owner);
        }

        public AssessmentRollPropertyWithRealPropertiesSpecification(int id) 
            : base(x => x.Id == id)
        {
        }
    }
}