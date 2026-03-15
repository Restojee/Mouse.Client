using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Mouse.NET.Data;

#nullable disable

namespace Mouse.NET.Migrations;

[DbContext(typeof(MouseDbContext))]
[Migration("20260315050300_AddRoleIsSystemFlag")]
public partial class AddRoleIsSystemFlag : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.AddColumn<bool>(
            name: "is_system",
            table: "roles",
            type: "boolean",
            nullable: false,
            defaultValue: false);
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.DropColumn(
            name: "is_system",
            table: "roles");
    }
}
