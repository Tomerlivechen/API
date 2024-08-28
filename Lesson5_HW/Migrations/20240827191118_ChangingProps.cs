using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lesson5_HW.Migrations
{
    /// <inheritdoc />
    public partial class ChangingProps : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ActorId",
                table: "Movie");

            migrationBuilder.DropColumn(
                name: "AwardId",
                table: "Movie");

            migrationBuilder.DropColumn(
                name: "MovieId",
                table: "Director");

            migrationBuilder.DropColumn(
                name: "MovieId",
                table: "Actor");

            migrationBuilder.RenameColumn(
                name: "year",
                table: "OscarAward",
                newName: "Year");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "Year",
                table: "OscarAward",
                newName: "year");

            migrationBuilder.AddColumn<string>(
                name: "ActorId",
                table: "Movie",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "AwardId",
                table: "Movie",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MovieId",
                table: "Director",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "MovieId",
                table: "Actor",
                type: "nvarchar(max)",
                nullable: true);
        }
    }
}
