using System.Collections.Generic;
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
            CreateMap<TaxDecOfRealProperty, PropertyToReturnDto>();
            CreateMap<AppUser, AppUserDto>().ReverseMap();
            CreateMap<PropertyToUpdateDto, TaxDecOfRealProperty>();
            CreateMap<PropertyToCreateDto, TaxDecOfRealProperty>();
            CreateMap<PhotoForCreationDto, Photo>();
            CreateMap<Photo, PhotoForDetailsDto>()
                .ForMember(d => d.Url, o => o.MapFrom<PropertyUrlResolver>());
            CreateMap<TaxDecOfRealProperty, PropertyToDeleteDto>();
        }
    }
}