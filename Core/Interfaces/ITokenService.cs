using System.Threading.Tasks;
using Core.Entities.Identity;

namespace Core.Interfaces
{
    public interface ITokenService
    {
        //  string CreateToken(AppUser user);
         Task<string> CreateToken(AppUser user);
    }
}