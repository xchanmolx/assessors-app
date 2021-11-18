using Core.Entities;

namespace Core.Specifications
{
    public class PhotosWithPropertySpecification : BaseSpecification<Photo>
    {
        public PhotosWithPropertySpecification()
        {
            AddInclude(x => x.TaxDecOfRealProperty);
        }
    }
}