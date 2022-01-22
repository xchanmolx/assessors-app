using Core.Entities;

namespace Core.Specifications
{
    public class MunicipalityCityDistrictWithFiltersForCountSpecification : BaseSpecification<MunicipalityCityDistrict>
    {
        public MunicipalityCityDistrictWithFiltersForCountSpecification(MunicipalityCityDistrictSpecParams municipalityCityDistrictSpecParams)
            :base(x =>
                (string.IsNullOrEmpty(municipalityCityDistrictSpecParams.Search) || x.Name.ToLower().Contains(municipalityCityDistrictSpecParams.Search)))
        {
        }
    }
}