using System.Net;
using System.Net.Sockets;
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
            // Production mode
            IPHostEntry hostEntry;
            hostEntry = Dns.GetHostEntry(Dns.GetHostName());
            foreach (IPAddress ip in hostEntry.AddressList)
            {
                if (ip.AddressFamily == AddressFamily.InterNetwork)
                {
                    if (!string.IsNullOrEmpty(source.PictureUrl))
                    {
                        return "http://" + ip + ":86/Content/" + source.PictureUrl;
                    }
                }
            }

            // Developement mode
            // if (!string.IsNullOrEmpty(source.PictureUrl))
            // {
            //     return _config["ApiUrl"] + source.PictureUrl;
            // }

            return null;
        }
    }
}