using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Smakosfera.WebAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddBanTimeColumntToUserTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "BanTime",
                table: "Users",
                type: "timestamp with time zone",
                nullable: true);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "BanTime",
                table: "Users");
        }
    }
}
