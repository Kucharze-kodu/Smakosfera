using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Smakosfera.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddAvatarColumnInUserTableAndImageColumnInRecipeTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "AvatarFileName",
                table: "Users",
                type: "text",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "ImageFileName",
                table: "Recipes",
                type: "text",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "AvatarFileName",
                table: "Users");

            migrationBuilder.DropColumn(
                name: "ImageFileName",
                table: "Recipes");
        }
    }
}
