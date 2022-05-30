using System.Linq;
using System.Net;
using System.Net.Sockets;
using API.Dtos;
using AutoMapper;
using Core.Entities;
using Microsoft.Extensions.Configuration;

namespace API.Helpers
{
    public class PropertyUrlResolver : IValueResolver<Photo, PhotoForDetailsDto, string>
    {
        private readonly IConfiguration _config;
        public PropertyUrlResolver(IConfiguration config)
        {
            _config = config;
        }

        public string Resolve(Photo source, PhotoForDetailsDto destination, string destMember, ResolutionContext context)
        {
            // Production mode
            IPHostEntry hostEntry;
            hostEntry = Dns.GetHostEntry(Dns.GetHostName());
            foreach (IPAddress ip in hostEntry.AddressList)
            {
                if (ip.AddressFamily == AddressFamily.InterNetwork)
                {
                    if (!string.IsNullOrEmpty(source.Url))
                    {
                        return "http://" + ip + ":86/" + source.Url;
                    }
                }
            }

            // Development mode
            // if (!string.IsNullOrEmpty(source.Url))
            // {
            //     return _config["ApiUrl"] + source.Url;
            // }

            return null;
        }
    }
}