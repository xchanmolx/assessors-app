using Core.Entities;

namespace Core.Specifications
{
    public class RevisePropertyWithRealPropertiesSpecification : BaseSpecification<TaxDecOfRealProperty>
    {
        public RevisePropertyWithRealPropertiesSpecification(ReviseSpecParams reviseParams)
            : base(x =>
                (string.IsNullOrEmpty(reviseParams.Search) || x.Owner.ToLower()
                    .Contains(reviseParams.Search) || x.TdNo.ToLower().Contains(reviseParams.Search)
                    || x.SurveyLotNo.ToLower().Contains(reviseParams.Search))
            )
        {
            AddInclude(x => x.Boundary);
            AddInclude(x => x.KindOfProperties);
        }

        public RevisePropertyWithRealPropertiesSpecification(int id) 
            : base(x => x.Id == id)
        {
        }
    }
}