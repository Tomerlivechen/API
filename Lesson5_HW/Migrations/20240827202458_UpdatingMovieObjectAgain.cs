using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Lesson5_HW.Migrations
{
    /// <inheritdoc />
    public partial class UpdatingMovieObjectAgain : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OscarAward_Movie_MovieId",
                table: "OscarAward");

            migrationBuilder.AlterColumn<int>(
                name: "MovieId",
                table: "OscarAward",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddColumn<string>(
                name: "AwardId",
                table: "Movie",
                type: "nvarchar(max)",
                nullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OscarAward_Movie_MovieId",
                table: "OscarAward",
                column: "MovieId",
                principalTable: "Movie",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_OscarAward_Movie_MovieId",
                table: "OscarAward");

            migrationBuilder.DropColumn(
                name: "AwardId",
                table: "Movie");

            migrationBuilder.AlterColumn<int>(
                name: "MovieId",
                table: "OscarAward",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "FK_OscarAward_Movie_MovieId",
                table: "OscarAward",
                column: "MovieId",
                principalTable: "Movie",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
