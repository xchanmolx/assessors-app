using Core.Entities;

namespace Core.Specifications
{
    public class ProvinceWithSpecification : BaseSpecification<Province>
    {
        public ProvinceWithSpecification(ProvinceSpecParams provinceSpecParams)
            :base(x =>
                (string.IsNullOrEmpty(provinceSpecParams.Search) || x.Name.ToLower().Contains(provinceSpecParams.Search)))
        {
            AddOrderBy(x => x.Name);
        }
    }
}