using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Migrations;
using Mouse.NET.Data;

#nullable disable

namespace Mouse.NET.Migrations;

[DbContext(typeof(MouseDbContext))]
[Migration("20260315195500_AddDescriptionToLevelFavorites")]
public partial class AddDescriptionToLevelFavorites : Migration
{
    protected override void Up(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.Sql(@"ALTER TABLE levels_favorites ADD COLUMN IF NOT EXISTS description text NULL;");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
        migrationBuilder.Sql(@"ALTER TABLE levels_favorites DROP COLUMN IF EXISTS description;");
    }
}
