using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinalProject3.Migrations
{
    /// <inheritdoc />
    public partial class ChangedRegister : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "1", "4d0e99d1-02a8-403f-90c6-b48f33234d49" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4d0e99d1-02a8-403f-90c6-b48f33234d49");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "389aa663-c474-4fb5-ac4c-0201ceb320f0");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "Email", "EmailConfirmed", "First_Name", "ImageAlt", "ImageURL", "Last_Name", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PermissionLevel", "PhoneNumber", "PhoneNumberConfirmed", "Prefix", "Pronouns", "SecurityStamp", "TwoFactorEnabled", "UserName", "VoteScore" },
                values: new object[] { "9f85da63-d589-4a78-bc9c-b94b452f4d7e", 0, "5f3a273c-9901-4ea8-8889-c3dbbcf49c65", "AppUser", "TomerLiveChen@gmail.com", false, "Tomer", "", "https://i.imgur.com/1nKIWjB.gif", "Chen", false, null, "TOMERLIVECHEN@GMAIL.COM", "SYSADMIN", "AQAAAAIAAYagAAAAEM41uKJRuerMlf/9Czb88gcCidsZzHY3TXB4YMQN7MJ3Vp7Icp8RQBe0LLk3OAM5pA==", "Admin", null, false, "Dr", "They", "02fc7042-90dc-4946-a44c-7a4ca26747e8", false, "SysAdmin", 0 });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "1", "9f85da63-d589-4a78-bc9c-b94b452f4d7e" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "1", "9f85da63-d589-4a78-bc9c-b94b452f4d7e" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "9f85da63-d589-4a78-bc9c-b94b452f4d7e");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "038aafee-a5b2-4d9f-a227-25d493ed4a80");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "Email", "EmailConfirmed", "First_Name", "ImageAlt", "ImageURL", "Last_Name", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PermissionLevel", "PhoneNumber", "PhoneNumberConfirmed", "Prefix", "Pronouns", "SecurityStamp", "TwoFactorEnabled", "UserName", "VoteScore" },
                values: new object[] { "4d0e99d1-02a8-403f-90c6-b48f33234d49", 0, "d0b6b326-bad8-4f67-bcef-4d4649c8b9a5", "AppUser", "TomerLiveChen@gmail.com", false, "Tomer", "", "https://i.imgur.com/1nKIWjB.gif", "Chen", false, null, "TOMERLIVECHEN@GMAIL.COM", "SYSADMIN", "AQAAAAIAAYagAAAAEGnSuNeX4jqjTnbl6etSS2C1N45WCjOrqNc9h9+1EDnf2FaXg2wY8h+ut5BPIcCKJQ==", "Admin", null, false, "Dr", "They", "90667c7a-2b6a-4770-9e64-57c196d165a4", false, "SysAdmin", 0 });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "1", "4d0e99d1-02a8-403f-90c6-b48f33234d49" });
        }
    }
}
