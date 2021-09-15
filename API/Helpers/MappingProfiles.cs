using API.Dtos;
using AutoMapper;
using Core.Entities;
using Core.Entities.Identity;

namespace API.Helpers
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<TaxDecOfRealProperty, PropertyToReturnDto>()
                .ForMember(d => d.PictureUrl, o => o.MapFrom<PropertyUrlResolver>());
            CreateMap<AppUser, AppUserDto>().ReverseMap();
            CreateMap<PropertyToUpdateDto, TaxDecOfRealProperty>();
            CreateMap<PropertyToCreateDto, TaxDecOfRealProperty>();
        }
    }
}