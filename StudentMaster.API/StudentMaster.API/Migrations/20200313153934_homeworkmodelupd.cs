using Microsoft.EntityFrameworkCore.Migrations;

namespace StudentMaster.API.Migrations
{
    public partial class homeworkmodelupd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Mark",
                table: "HomeworkItems",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Status",
                table: "HomeworkItems",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Mark",
                table: "HomeworkItems");

            migrationBuilder.DropColumn(
                name: "Status",
                table: "HomeworkItems");
        }
    }
}
