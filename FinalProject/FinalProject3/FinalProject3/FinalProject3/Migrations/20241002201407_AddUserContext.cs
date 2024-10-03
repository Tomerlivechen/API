using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace FinalProject3.Migrations
{
    /// <inheritdoc />
    public partial class AddUserContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notification_AspNetUsers_userId",
                table: "Notification");

            migrationBuilder.DropForeignKey(
                name: "FK_Votes_AspNetUsers_VoterId",
                table: "Votes");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "1", "84431fea-b734-4e91-a3a6-3590147124c2" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "84431fea-b734-4e91-a3a6-3590147124c2");

            migrationBuilder.AlterColumn<string>(
                name: "VoterId",
                table: "Votes",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.AlterColumn<string>(
                name: "userId",
                table: "Notification",
                type: "nvarchar(450)",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "nvarchar(450)");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "da4fd54d-df6d-4e97-a0d0-ce684721027b");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "BlockedId", "ConcurrencyStamp", "Discriminator", "Email", "EmailConfirmed", "First_Name", "FollowingId", "ImageAlt", "ImageURL", "Last_Name", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PermissionLevel", "PhoneNumber", "PhoneNumberConfirmed", "Prefix", "Pronouns", "SecurityStamp", "TwoFactorEnabled", "UserName", "VoteScore" },
                values: new object[] { "b0cb5377-54c4-4e0d-8c69-44801aa599a7", 0, "[]", "da11d4fb-79bd-4646-a9cb-ec9afedee872", "AppUser", "TomerLiveChen@gmail.com", false, "Tomer", "[]", "", "https://i.imgur.com/1nKIWjB.gif", "Chen", false, null, "TOMERLIVECHEN@GMAIL.COM", "SYSADMIN", "AQAAAAIAAYagAAAAEOTi/X5Nkr9OUJnfSTPzskJTi63TlraBjHTqiw0O1yUw+YuTJdNuBae0zW7oi5gE+Q==", "Admin", null, false, "Dr", "They", "17315f66-ca92-4fe0-b88c-b4c4edc02fae", false, "SysAdmin", 0 });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "1", "b0cb5377-54c4-4e0d-8c69-44801aa599a7" });

            migrationBuilder.AddForeignKey(
                name: "FK_Notification_AspNetUsers_userId",
                table: "Notification",
                column: "userId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Votes_AspNetUsers_VoterId",
                table: "Votes",
                column: "VoterId",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Notification_AspNetUsers_userId",
                table: "Notification");

            migrationBuilder.DropForeignKey(
                name: "FK_Votes_AspNetUsers_VoterId",
                table: "Votes");

            migrationBuilder.DeleteData(
                table: "AspNetUserRoles",
                keyColumns: new[] { "RoleId", "UserId" },
                keyValues: new object[] { "1", "b0cb5377-54c4-4e0d-8c69-44801aa599a7" });

            migrationBuilder.DeleteData(
                table: "AspNetUsers",
                keyColumn: "Id",
                keyValue: "b0cb5377-54c4-4e0d-8c69-44801aa599a7");

            migrationBuilder.AlterColumn<string>(
                name: "VoterId",
                table: "Votes",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "userId",
                table: "Notification",
                type: "nvarchar(450)",
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "nvarchar(450)",
                oldNullable: true);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "1",
                column: "ConcurrencyStamp",
                value: "ab0aac35-96cd-45b6-bfcc-b516d876a21a");

            migrationBuilder.InsertData(
                table: "AspNetUsers",
                columns: new[] { "Id", "AccessFailedCount", "BlockedId", "ConcurrencyStamp", "Discriminator", "Email", "EmailConfirmed", "First_Name", "FollowingId", "ImageAlt", "ImageURL", "Last_Name", "LockoutEnabled", "LockoutEnd", "NormalizedEmail", "NormalizedUserName", "PasswordHash", "PermissionLevel", "PhoneNumber", "PhoneNumberConfirmed", "Prefix", "Pronouns", "SecurityStamp", "TwoFactorEnabled", "UserName", "VoteScore" },
                values: new object[] { "84431fea-b734-4e91-a3a6-3590147124c2", 0, "[]", "3080fc6a-7ca1-4aa8-a909-91fd4a03fc46", "AppUser", "TomerLiveChen@gmail.com", false, "Tomer", "[]", "", "https://i.imgur.com/1nKIWjB.gif", "Chen", false, null, "TOMERLIVECHEN@GMAIL.COM", "SYSADMIN", "AQAAAAIAAYagAAAAEJRqjvSWlkfPOjvvol5E1zULsaa+9GwaoBDW9fmPgLztHFK3ezWFMrwMjsEygVsNog==", "Admin", null, false, "Dr", "They", "f28f96af-96d2-4824-b85a-d304d4da4d10", false, "SysAdmin", 0 });

            migrationBuilder.InsertData(
                table: "AspNetUserRoles",
                columns: new[] { "RoleId", "UserId" },
                values: new object[] { "1", "84431fea-b734-4e91-a3a6-3590147124c2" });

            migrationBuilder.AddForeignKey(
                name: "FK_Notification_AspNetUsers_userId",
                table: "Notification",
                column: "userId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Votes_AspNetUsers_VoterId",
                table: "Votes",
                column: "VoterId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
