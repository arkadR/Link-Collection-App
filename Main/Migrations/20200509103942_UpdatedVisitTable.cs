using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LinkCollectionApp.Migrations
{
    public partial class UpdatedVisitTable : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK__PubColVi__37E09F67E467D0D0",
                schema: "app",
                table: "PublicCollectionVisits");

            migrationBuilder.AddColumn<int>(
                name: "CollectionId",
                schema: "app",
                table: "PublicCollectionVisits",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<DateTime>(
                name: "Date",
                schema: "app",
                table: "PublicCollectionVisits",
                type: "datetime",
                nullable: false,
                defaultValueSql: "(getdate())");

            migrationBuilder.AddPrimaryKey(
                name: "PK_PublicCollectionVisits",
                schema: "app",
                table: "PublicCollectionVisits",
                column: "Id");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_PublicCollectionVisits",
                schema: "app",
                table: "PublicCollectionVisits");

            migrationBuilder.DropColumn(
                name: "CollectionId",
                schema: "app",
                table: "PublicCollectionVisits");

            migrationBuilder.DropColumn(
                name: "Date",
                schema: "app",
                table: "PublicCollectionVisits");

            migrationBuilder.AddPrimaryKey(
                name: "PK__PubColVi__37E09F67E467D0D0",
                schema: "app",
                table: "PublicCollectionVisits",
                column: "Id");
        }
    }
}
