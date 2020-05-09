using Microsoft.EntityFrameworkCore.Migrations;

namespace LinkCollectionApp.Migrations
{
    public partial class PublicCollectionStats : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PublicCollectionVisits",
                schema: "app",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DeviceOS = table.Column<string>(unicode: false, maxLength: 100, nullable: false),
                    BrowserName = table.Column<string>(unicode: false, maxLength: 100, nullable: false),
                    Country = table.Column<string>(unicode: false, maxLength: 100, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK__PubColVi__37E09F67E467D0D0", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PublicCollectionVisits",
                schema: "app");
        }
    }
}
