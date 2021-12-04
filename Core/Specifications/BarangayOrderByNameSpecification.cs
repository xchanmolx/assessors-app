using Core.Entities;

namespace Core.Specifications
{
    public class BarangayOrderByNameSpecification : BaseSpecification<Barangay>
    {
        public BarangayOrderByNameSpecification()
        {
            AddOrderBy(x => x.Name);
        }
    }
}