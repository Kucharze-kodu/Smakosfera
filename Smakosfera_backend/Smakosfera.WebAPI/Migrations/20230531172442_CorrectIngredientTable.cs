using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Smakosfera.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class CorrectIngredientTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "CreatedById",
                table: "Ingredients",
                type: "integer",
                nullable: true);

            migrationBuilder.AddColumn<bool>(
                name: "IsConfirmed",
                table: "Ingredients",
                type: "boolean",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_CreatedById",
                table: "Ingredients",
                column: "CreatedById");

            migrationBuilder.AddForeignKey(
                name: "FK_Ingredients_Users_CreatedById",
                table: "Ingredients",
                column: "CreatedById",
                principalTable: "Users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Ingredients_Users_CreatedById",
                table: "Ingredients");

            migrationBuilder.DropIndex(
                name: "IX_Ingredients_CreatedById",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "CreatedById",
                table: "Ingredients");

            migrationBuilder.DropColumn(
                name: "IsConfirmed",
                table: "Ingredients");
        }
    }
}
