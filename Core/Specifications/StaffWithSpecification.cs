using Core.Entities;

namespace Core.Specifications
{
    public class StaffWithSpecification : BaseSpecification<Staff>
    {
        public StaffWithSpecification(StaffSpecParams staffSpecParams)
            :base(x =>
                (string.IsNullOrEmpty(staffSpecParams.Search) || x.Name.ToLower().Contains(staffSpecParams.Search)))
        {
            AddOrderBy(x => x.Name);
        }
    }
}