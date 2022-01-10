using Core.Entities;

namespace Core.Specifications
{
    public class StaffWithFiltersForCountSpecification : BaseSpecification<Staff>
    {
        public StaffWithFiltersForCountSpecification(StaffSpecParams staffSpecParams)
            :base(x => 
                (string.IsNullOrEmpty(staffSpecParams.Search) || x.Name.ToLower().Contains(staffSpecParams.Search)))
        {
        }
    }
}