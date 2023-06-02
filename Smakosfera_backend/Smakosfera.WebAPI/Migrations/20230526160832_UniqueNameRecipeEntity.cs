﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Smakosfera.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class UniqueNameRecipeEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Recipes_Name",
                table: "Recipes",
                column: "Name",
                unique: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_Recipes_Name",
                table: "Recipes");
        }
    }
}
