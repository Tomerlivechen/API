using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinalProject3.Migrations
{
    /// <inheritdoc />
    public partial class typo : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "1", "3ecaa759-4f09-4a4f-beb5-e679375b0a2e" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "3ecaa759-4f09-4a4f-beb5-e679375b0a2e");

            migrationBuilder.RenameColumn(
                name: "PremissionLevel",
                table: "AspNetUsers",
                newName: "PermissionLevel");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "1", "4d0e99d1-02a8-403f-90c6-b48f33234d49" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "4d0e99d1-02a8-403f-90c6-b48f33234d49");

            migrationBuilder.RenameColumn(
                name: "PermissionLevel",
                table: "AspNetUsers",
                newName: "PremissionLevel");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "434b4977-033f-40e7-ac63-54e97becd38d");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "ConcurrencyStamp", "Discriminator", "Email", "EmailConfirmed", "First_Name", "ImageAlt", "ImageURL", "Last_Name", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PhoneNumber", "PhoneNumberConfirmed", "Prefix", "PremissionLevel", "Pronouns", "SecurityStamp", "TwoFactorEnabled", "UserName", "VoteScore" },
                values: new object[] { "3ecaa759-4f09-4a4f-beb5-e679375b0a2e", 0, "5148980c-5465-40be-b280-fc6fc09acf97", "AppUser", "TomerLiveChen@gmail.com", false, "Tomer", "", "https://i.imgur.com/1nKIWjB.gif", "Chen", false, null, "TOMERLIVECHEN@GMAIL.COM", "SYSADMIN", "AQAAAAIAAYagAAAAEJt6ofgdxBYIlFRbqIdUUtwrdY7EydOLtUe+ckgGwXOsq8UQu4Jo3MDpgr3hJ8JsxA==", null, false, "Dr", "Admin", "They", "7208f70a-a108-498c-87c7-54c2e6132bdc", false, "SysAdmin", 0 });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "1", "3ecaa759-4f09-4a4f-beb5-e679375b0a2e" });
        }
    }
}
