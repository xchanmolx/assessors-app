using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager)
        {
            if (!userManager.Users.Any())
            {
                var user = new AppUser
                {
                    FirstName = "Chiantine",
                    LastName = "Manigos",
                    Gender = "Male",
                    Address = "Purok 7, Tagaytay Bojo, Aloguinsan, Cebu",
                    Email = "cmanigos@gmail.com",
                    UserName = "cmanigos@gmail.com",
                    PhoneNumber = "09163609855"
                };

                await userManager.CreateAsync(user, "Pa$$w0rd");
            }
        }
    }
}