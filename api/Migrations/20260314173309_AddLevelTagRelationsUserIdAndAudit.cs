using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mouse.NET.Migrations
{
    /// <inheritdoc />
    public partial class AddLevelTagRelationsUserIdAndAudit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "created_utc_date",
                table: "level_tag_relations",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<DateTime>(
                name: "modified_utc_date",
                table: "level_tag_relations",
                type: "timestamp with time zone",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "user_id",
                table: "level_tag_relations",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_level_tag_relations_user_id",
                table: "level_tag_relations",
                column: "user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_level_tag_relations_users_user_id",
                table: "level_tag_relations",
                column: "user_id",
                principalTable: "users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_level_tag_relations_users_user_id",
                table: "level_tag_relations");

            migrationBuilder.DropIndex(
                name: "IX_level_tag_relations_user_id",
                table: "level_tag_relations");

            migrationBuilder.DropColumn(
                name: "created_utc_date",
                table: "level_tag_relations");

            migrationBuilder.DropColumn(
                name: "modified_utc_date",
                table: "level_tag_relations");

            migrationBuilder.DropColumn(
                name: "user_id",
                table: "level_tag_relations");
        }
    }
}
