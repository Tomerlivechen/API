using Microsoft.EntityFrameworkCore;

namespace Lesson7_HW.Models
{
    [PrimaryKey("UserId", "RoleId")]
    public class UserRoles
    {
        public required int UserId { get; set; }
        public required int RoleId { get; set; }

    }
}
