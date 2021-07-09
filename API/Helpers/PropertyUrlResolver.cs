using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class PropertyUrlResolver : IValueResolver<TaxDecOfRealProperty, PropertyToReturnDto, string>
    {
         private readonly IConfiguration _config;
        public PropertyUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(TaxDecOfRealProperty source, PropertyToReturnDto destination, string destMember, ResolutionContext context)
        {
            if (!string.IsNullOrEmpty(source.PictureUrl))
            {
                return _config["ApiUrl"] + source.PictureUrl;
            }

            return null;
        }   
    }
}