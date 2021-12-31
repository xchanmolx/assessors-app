using Core.Entities;

namespace Core.Specifications
{
    public class BarangayWithSpecification : BaseSpecification<Barangay>
    {
        public BarangayWithSpecification(BarangaySpecParams barangaySpecParams)
            :base(x => 
                (string.IsNullOrEmpty(barangaySpecParams.Search) || x.Name.ToLower().Contains(barangaySpecParams.Search)))
        {
            AddOrderBy(x => x.Name);
        }
    }
}