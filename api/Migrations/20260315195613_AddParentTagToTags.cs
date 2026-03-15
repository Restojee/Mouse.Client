using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mouse.NET.Migrations
{
    /// <inheritdoc />
    public partial class AddParentTagToTags : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "parent_tag_id",
                table: "tags",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_tags_parent_tag_id",
                table: "tags",
                column: "parent_tag_id");

            migrationBuilder.AddForeignKey(
                name: "FK_tags_tags_parent_tag_id",
                table: "tags",
                column: "parent_tag_id",
                principalTable: "tags",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_tags_tags_parent_tag_id",
                table: "tags");

            migrationBuilder.DropIndex(
                name: "IX_tags_parent_tag_id",
                table: "tags");

            migrationBuilder.DropColumn(
                name: "parent_tag_id",
                table: "tags");
        }
    }
}
