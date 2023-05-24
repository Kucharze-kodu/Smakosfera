using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace Smakosfera.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class IngredientEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_Dificulty_Levels_DifficultyLevelId",
                table: "Recipes");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Dificulty_Levels",
                table: "Dificulty_Levels");

            migrationBuilder.RenameTable(
                name: "Dificulty_Levels",
                newName: "Difficulty_Levels");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Difficulty_Levels",
                table: "Difficulty_Levels",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Ingredients",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Name = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Ingredients", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Recipes_Ingredients",
                columns: table => new
                {
                    RecipeIngredientId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    RecipeId = table.Column<int>(type: "integer", nullable: false),
                    IngredientId = table.Column<int>(type: "integer", nullable: false),
                    Amount = table.Column<int>(type: "integer", nullable: false),
                    Unit = table.Column<string>(type: "text", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Recipes_Ingredients", x => x.RecipeIngredientId);
                    table.ForeignKey(
                        name: "FK_Recipes_Ingredients_Ingredients_IngredientId",
                        column: x => x.IngredientId,
                        principalTable: "Ingredients",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Recipes_Ingredients_Recipes_RecipeId",
                        column: x => x.RecipeId,
                        principalTable: "Recipes",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Ingredients_Name",
                table: "Ingredients",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_Ingredients_IngredientId",
                table: "Recipes_Ingredients",
                column: "IngredientId");

            migrationBuilder.CreateIndex(
                name: "IX_Recipes_Ingredients_RecipeId",
                table: "Recipes_Ingredients",
                column: "RecipeId");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_Difficulty_Levels_DifficultyLevelId",
                table: "Recipes",
                column: "DifficultyLevelId",
                principalTable: "Difficulty_Levels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Recipes_Difficulty_Levels_DifficultyLevelId",
                table: "Recipes");

            migrationBuilder.DropTable(
                name: "Recipes_Ingredients");

            migrationBuilder.DropTable(
                name: "Ingredients");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Difficulty_Levels",
                table: "Difficulty_Levels");

            migrationBuilder.RenameTable(
                name: "Difficulty_Levels",
                newName: "Dificulty_Levels");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Dificulty_Levels",
                table: "Dificulty_Levels",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_Recipes_Dificulty_Levels_DifficultyLevelId",
                table: "Recipes",
                column: "DifficultyLevelId",
                principalTable: "Dificulty_Levels",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
