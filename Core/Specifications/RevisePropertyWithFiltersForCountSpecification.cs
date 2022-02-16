using Core.Entities;

namespace Core.Specifications
{
    public class RevisePropertyWithFiltersForCountSpecification : BaseSpecification<TaxDecOfRealProperty>
    {
        public RevisePropertyWithFiltersForCountSpecification(ReviseSpecParams reviseParams)
            : base(x =>
                (string.IsNullOrEmpty(reviseParams.Search) || x.Owner.ToLower()
                    .Contains(reviseParams.Search) || x.TdNo.ToLower().Contains(reviseParams.Search)
                    || x.SurveyLotNo.ToLower().Contains(reviseParams.Search))
            )
        {
        }
    }
}