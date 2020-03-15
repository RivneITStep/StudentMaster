using Microsoft.EntityFrameworkCore.Migrations;

namespace StudentMaster.API.Migrations
{
    public partial class upd : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "ownerId",
                table: "HomeworkItems",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_HomeworkItems_ownerId",
                table: "HomeworkItems",
                column: "ownerId");

            migrationBuilder.AddForeignKey(
                name: "FK_HomeworkItems_AspNetUsers_ownerId",
                table: "HomeworkItems",
                column: "ownerId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_HomeworkItems_AspNetUsers_ownerId",
                table: "HomeworkItems");

            migrationBuilder.DropIndex(
                name: "IX_HomeworkItems_ownerId",
                table: "HomeworkItems");

            migrationBuilder.DropColumn(
                name: "ownerId",
                table: "HomeworkItems");
        }
    }
}
