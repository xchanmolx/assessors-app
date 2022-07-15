using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using Core.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace Infrastructure.Identity
{
    public class AppIdentityDbContextSeed
    {
        public static async Task SeedUsersAsync(UserManager<AppUser> userManager,
            RoleManager<Role> roleManager)
        {
            // for Production Server like GoDaddy
            // var path = Path.GetDirectoryName(Assembly.GetExecutingAssembly().Location);

            if (!userManager.Users.Any())
            {
                // for Production Server like GoDaddy
                // var userData = File.ReadAllText(path + @"/Data/SeedData/userSeedData.json");

                // for Development & Production for IIS
                var userData = File.ReadAllText("../Infrastructure/Data/SeedData/userSeedData.json");
                var users = JsonConvert.DeserializeObject<List<AppUser>>(userData);

                // Create some roles
                var roles = new List<Role> 
                {
                    new Role { Name = "Member" },
                    new Role { Name = "Moderator" },
                    new Role { Name = "Admin" }
                };

                foreach (var role in roles)
                {
                    await roleManager.CreateAsync(role);
                }

                foreach (var user in users)
                {
                    userManager.CreateAsync(user, "Pa$$w0rd").Wait();
                    userManager.AddToRoleAsync(user, "Member").Wait();
                }

                var adminUser = new AppUser
                {
                    FirstName = "Chiantine",
                    LastName = "Manigos",
                    Gender = "male",
                    Address = "Purok 7, Tagaytay Bojo, Aloguinsan, Cebu",
                    Email = "cmanigos@gmail.com",
                    UserName = "cmanigos@gmail.com",
                    PhoneNumber = "09163609855"
                };

                var result = userManager.CreateAsync(adminUser, "Pa$$w0rd").Result;

                if (result.Succeeded)
                {
                    var admin = userManager.FindByNameAsync("cmanigos@gmail.com").Result;
                    userManager.AddToRolesAsync(admin, new[] { "Admin", "Moderator" }).Wait();
                }
            }
        }
    }
}