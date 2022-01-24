using Core.Entities;

namespace Core.Specifications
{
    public class ProvinceWithFiltersForCountSpecification : BaseSpecification<Province>
    {
        public ProvinceWithFiltersForCountSpecification(ProvinceSpecParams provinceSpecParams)
            :base(x =>
                (string.IsNullOrEmpty(provinceSpecParams.Search) || x.Name.ToLower().Contains(provinceSpecParams.Search)))
        {
        }
    }
}