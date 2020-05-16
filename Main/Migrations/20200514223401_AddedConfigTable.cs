using Microsoft.EntityFrameworkCore.Migrations;

namespace LinkCollectionApp.Migrations
{
  public partial class AddedConfigTable : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.CreateTable(
               name: "Configuration",
               schema: "app",
               columns: table => new
               {
                 Key = table.Column<string>(unicode: false, maxLength: 100, nullable: false),
                 Value = table.Column<string>(unicode: false, maxLength: 100, nullable: false)
               },
               constraints: table =>
               {
                 table.PrimaryKey("PK__Configuration__XOCTKZ6IAQ", x => x.Key);
               });
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
              name: "Configuration",
              schema: "app");
    }
  }
}
