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
            
            // Lists for Real Property Mix Use
            CreateMap<KindOfProperty, KindOfPropertyMixUseForListDto>();

            // Lists for Land Real Property
            CreateMap<TaxDecOfRealProperty, LandPropertyToReturnDto>();

            // Lists for Land Real Property
            CreateMap<TaxDecOfRealProperty, ReviseToReturnDto>();

            // Lists for Land Real Property
            CreateMap<TaxDecOfRealProperty, LandPropertyMixUseToReturnDto>();

            // List for Real Property for Years
            CreateMap<TaxDecOfRealProperty, PropertyForYearsToReturnDto>();

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

            // Creation for Agricultural Land
            CreateMap<AgriculturalToCreateDto, AgriculturalLand>();
            // Update for Agricultural Land
            CreateMap<AgriculturalToUpdateDto, AgriculturalLand>();
            // Delete for Agricultural Land
            CreateMap<AgriculturalLand, AgriculturalToDeleteDto>();

            // Creation for Commercial Land
            CreateMap<CommercialToCreateDto, CommercialLand>();
            // Update for Commercial Land
            CreateMap<CommercialToUpdateDto, CommercialLand>();
            // Delete for Commercial Land
            CreateMap<CommercialLand, CommercialToDeleteDto>();

            // Creation for Industrial Land
            CreateMap<IndustrialToCreateDto, IndustrialLand>();
            // Update for Industrial Land
            CreateMap<IndustrialToUpdateDto, IndustrialLand>();
            // Delete for Industrial Land
            CreateMap<IndustrialLand, IndustrialToDeleteDto>();

            // Creation for Residential Land
            CreateMap<ResidentialToCreateDto, ResidentialLand>();
            // Update for Residential Land
            CreateMap<ResidentialToUpdateDto, ResidentialLand>();
            // Delete for Residential Land
            CreateMap<ResidentialLand, ResidentialToDeleteDto>();

            // Creation for Barangay
            CreateMap<BarangayToCreateDto, Barangay>();
            // Update for Barangay
            CreateMap<BarangayToUpdateDto, Barangay>();
            // Delete for Barangay
            CreateMap<Barangay, BarangayToDeleteDto>();

            // Creation for Staff
            CreateMap<StaffToCreateDto, Staff>();
            // Update for Staff
            CreateMap<StaffToUpdateDto, Staff>();
            // Delete for Staff
            CreateMap<Staff, StaffToDeleteDto>();

            // Creation for Municipality / City / District
            CreateMap<MunicipalityCityDistrictToCreateDto, MunicipalityCityDistrict>();
            // Update for Municipality / City / District
            CreateMap<MunicipalityCityDistrictToUpdateDto, MunicipalityCityDistrict>();
            // Delete for Municipality / City / District
            CreateMap<MunicipalityCityDistrict, MunicipalityCityDistrictToDeleteDto>();

            // Creation for Province
            CreateMap<ProvinceToCreateDto, Province>();
            // Update for Province
            CreateMap<ProvinceToUpdateDto, Province>();
            // Delete for Province
            CreateMap<Province, ProvinceToDeleteDto>();

            // Creation for Logo
            CreateMap<Logo, LogoForCreationDto>();
            // Load for Logos
            CreateMap<Logo, LogoForDetailsDto>()
                .ForMember(d => d.Url, o => o.MapFrom<PropertyUrlResolverForLogo>());
            // Delete for Logo
            CreateMap<Logo, LogoToDeleteDto>();
        }
    }
}