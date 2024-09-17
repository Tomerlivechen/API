using Microsoft.EntityFrameworkCore;

namespace HW_Lesson_6.Models
{
    [PrimaryKey("UserId", "RoleId")]
    public class UserRoles
    {
        public required int UserId { get; set; }
        public required int RoleId { get; set; }

    }
}
