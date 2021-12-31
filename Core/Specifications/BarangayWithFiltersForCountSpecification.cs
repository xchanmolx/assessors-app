using Core.Entities;

namespace Core.Specifications
{
    public class BarangayWithFiltersForCountSpecification : BaseSpecification<Barangay>
    {
        public BarangayWithFiltersForCountSpecification(BarangaySpecParams barangaySpecParams)
            :base(x => 
                (string.IsNullOrEmpty(barangaySpecParams.Search) || x.Name.ToLower().Contains(barangaySpecParams.Search)))
        {
        }
    }
}