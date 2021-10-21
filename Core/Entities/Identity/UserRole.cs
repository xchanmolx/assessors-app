using Microsoft.AspNetCore.Identity;

namespace Core.Entities.Identity
{
    public class UserRole : IdentityUserRole<int>
    {
        public virtual AppUser User { get; set; }
        public virtual Role Role { get; set; }
    }
}