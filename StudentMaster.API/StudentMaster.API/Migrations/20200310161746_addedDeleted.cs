using Microsoft.EntityFrameworkCore.Migrations;

namespace StudentMaster.API.Migrations
{
    public partial class addedDeleted : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "isDeleted",
                table: "Subjects",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "isDeleted",
                table: "Classes",
                nullable: false,
                defaultValue: false);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "isDeleted",
                table: "Subjects");

            migrationBuilder.DropColumn(
                name: "isDeleted",
                table: "Classes");
        }
    }
}
