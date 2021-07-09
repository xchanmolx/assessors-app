using API.Dtos;
using AutoMapper;
using Core.Entities;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<TaxDecOfRealProperty, PropertyToReturnDto>()
                .ForMember(d => d.PictureUrl, o => o.MapFrom<PropertyUrlResolver>());
        }
    }
}