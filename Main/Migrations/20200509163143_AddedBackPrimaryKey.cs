using Microsoft.EntityFrameworkCore.Migrations;

namespace LinkCollectionApp.Migrations
{
    public partial class AddedBackPrimaryKey : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PublicCollectionVisits",
                schema: "app",
                table: "PublicCollectionVisits");

            migrationBuilder.AddPrimaryKey(
                name: "PK__PubColVi__37E09F67E467D0D0",
                schema: "app",
                table: "PublicCollectionVisits",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK__PubColVi__37E09F67E467D0D0",
                schema: "app",
                table: "PublicCollectionVisits");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PublicCollectionVisits",
                schema: "app",
                table: "PublicCollectionVisits",
                column: "Id");
        }
    }
}
