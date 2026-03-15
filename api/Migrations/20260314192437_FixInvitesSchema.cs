using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Mouse.NET.Migrations
{
    /// <inheritdoc />
    public partial class FixInvitesSchema : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "expiration_date ",
                table: "Invites",
                newName: "expiration_date");

            migrationBuilder.AddColumn<int>(
                name: "registered_user_id",
                table: "Invites",
                type: "integer",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Invites_registered_user_id",
                table: "Invites",
                column: "registered_user_id");

            migrationBuilder.AddForeignKey(
                name: "FK_Invites_users_registered_user_id",
                table: "Invites",
                column: "registered_user_id",
                principalTable: "users",
                principalColumn: "Id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Invites_users_registered_user_id",
                table: "Invites");

            migrationBuilder.DropIndex(
                name: "IX_Invites_registered_user_id",
                table: "Invites");

            migrationBuilder.DropColumn(
                name: "registered_user_id",
                table: "Invites");

            migrationBuilder.RenameColumn(
                name: "expiration_date",
                table: "Invites",
                newName: "expiration_date ");
        }
    }
}
