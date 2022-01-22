using Core.Entities;

namespace Core.Specifications
{
    public class MunicipalityCityDistrictWithSpecification : BaseSpecification<MunicipalityCityDistrict>
    {
        public MunicipalityCityDistrictWithSpecification(MunicipalityCityDistrictSpecParams municipalityCityDistrictSpecParams)
            :base(x =>
                (string.IsNullOrEmpty(municipalityCityDistrictSpecParams.Search) || x.Name.ToLower().Contains(municipalityCityDistrictSpecParams.Search)))
        {
            AddOrderBy(x => x.Name);
        }
    }
}