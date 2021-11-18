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
            // Real Property Tracer | Search for Survey Lot No.
            CreateMap<TaxDecOfRealProperty, PropertyToTraceDto>();
            CreateMap<KindOfProperty, KindOfPropertyForAreaDto>();

            CreateMap<AppUser, AppUserDto>().ReverseMap();
            CreateMap<Photo, PhotoForDetailsDto>()
                .ForMember(d => d.Url, o => o.MapFrom<PropertyUrlResolver>());
            CreateMap<TaxDecOfRealProperty, PropertyToDeleteDto>();
            CreateMap<Photo, PhotoToDeleteDto>();
            CreateMap<AppUser, UserToDeleteDto>();

            // Lists for Real Property
            CreateMap<TaxDecOfRealProperty, PropertyToReturnDto>();
            CreateMap<Boundary, BoundaryForListDto>();
            CreateMap<KindOfProperty, KindOfPropertyForListDto>();

            // Creation for Real Property
            CreateMap<PropertyToCreateDto, TaxDecOfRealProperty>();
            CreateMap<BoundaryToCreateDto, Boundary>();
            CreateMap<KindOfPropertyToCreateDto, KindOfProperty>();

            // Creation for Photos
            CreateMap<Photo, PhotoForCreationDto>();

            // Update for Real Property
            CreateMap<PropertyToUpdateDto, TaxDecOfRealProperty>();
            CreateMap<BoundaryToUpdateDto, Boundary>();
            CreateMap<KindOfPropertyToUpdateDto, KindOfProperty>();
        }
    }
}