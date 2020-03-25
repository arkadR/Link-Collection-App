using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace LinkCollectionApp.Migrations
{
  public partial class AddedModels : Migration
  {
    protected override void Up(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.EnsureSchema(
          name: "app");

      migrationBuilder.CreateTable(
          name: "Collection",
          schema: "app",
          columns: table => new
          {
            Id = table.Column<int>(nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            IsPublic = table.Column<bool>(nullable: true, defaultValueSql: "((0))"),
            OwnerId = table.Column<string>(maxLength: 450, nullable: false),
            Name = table.Column<string>(unicode: false, maxLength: 100, nullable: true),
            Description = table.Column<string>(unicode: false, maxLength: 255, nullable: true),
            CreatedDate = table.Column<DateTime>(type: "datetime", nullable: false, defaultValueSql: "(getdate())")
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Collection", x => x.Id);
            table.ForeignKey(
                      name: "FK__Collectio__Owner__4AB81AF0",
                      column: x => x.OwnerId,
                      principalTable: "AspNetUsers",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Restrict);
          });

      migrationBuilder.CreateTable(
          name: "Element",
          schema: "app",
          columns: table => new
          {
            Id = table.Column<int>(nullable: false)
                  .Annotation("SqlServer:Identity", "1, 1"),
            CollectionId = table.Column<int>(nullable: false),
            OwnerId = table.Column<string>(maxLength: 450, nullable: false),
            Link = table.Column<string>(unicode: false, maxLength: 255, nullable: false),
            Name = table.Column<string>(unicode: false, maxLength: 100, nullable: true),
            Description = table.Column<string>(unicode: false, maxLength: 255, nullable: true),
            Sequence = table.Column<int>(nullable: true)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK_Element", x => x.Id);
            table.ForeignKey(
                      name: "FK__Element__Collect__4E88ABD4",
                      column: x => x.CollectionId,
                      principalSchema: "app",
                      principalTable: "Collection",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Restrict);
            table.ForeignKey(
                      name: "FK__Element__OwnerId__4F7CD00D",
                      column: x => x.OwnerId,
                      principalTable: "AspNetUsers",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Restrict);
          });

      migrationBuilder.CreateTable(
          name: "SavedCollection",
          schema: "app",
          columns: table => new
          {
            UserId = table.Column<string>(nullable: false),
            CollectionId = table.Column<int>(nullable: false)
          },
          constraints: table =>
          {
            table.PrimaryKey("PK__SavedCol__4056A78C17156444", x => new { x.UserId, x.CollectionId });
            table.ForeignKey(
                      name: "FK__SavedColl__Colle__59063A47",
                      column: x => x.CollectionId,
                      principalSchema: "app",
                      principalTable: "Collection",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Restrict);
            table.ForeignKey(
                      name: "FK__SavedColl__UserI__5812160E",
                      column: x => x.UserId,
                      principalTable: "AspNetUsers",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Restrict);
          });

      migrationBuilder.CreateTable(
          name: "SharedCollection",
          schema: "app",
          columns: table => new
          {
            CollectionId = table.Column<int>(nullable: false),
            UserId = table.Column<string>(nullable: false),
            ViewRights = table.Column<bool>(nullable: true, defaultValueSql: "((1))"),
            EditRights = table.Column<bool>(nullable: true, defaultValueSql: "((0))")
          },
          constraints: table =>
          {
            table.PrimaryKey("PK__SharedCo__4056A78CB4AA5C4A", x => new { x.UserId, x.CollectionId });
            table.ForeignKey(
                      name: "FK__SharedCol__Colle__52593CB8",
                      column: x => x.CollectionId,
                      principalSchema: "app",
                      principalTable: "Collection",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Restrict);
            table.ForeignKey(
                      name: "FK__SharedCol__UserI__534D60F1",
                      column: x => x.UserId,
                      principalTable: "AspNetUsers",
                      principalColumn: "Id",
                      onDelete: ReferentialAction.Restrict);
          });

      migrationBuilder.CreateIndex(
          name: "IX_Collection_OwnerId",
          schema: "app",
          table: "Collection",
          column: "OwnerId");

      migrationBuilder.CreateIndex(
          name: "IX_Element_CollectionId",
          schema: "app",
          table: "Element",
          column: "CollectionId");

      migrationBuilder.CreateIndex(
          name: "IX_Element_OwnerId",
          schema: "app",
          table: "Element",
          column: "OwnerId");

      migrationBuilder.CreateIndex(
          name: "IX_SavedCollection_CollectionId",
          schema: "app",
          table: "SavedCollection",
          column: "CollectionId");

      migrationBuilder.CreateIndex(
          name: "IX_SharedCollection_CollectionId",
          schema: "app",
          table: "SharedCollection",
          column: "CollectionId");
    }

    protected override void Down(MigrationBuilder migrationBuilder)
    {
      migrationBuilder.DropTable(
            name: "Element",
            schema: "app");

      migrationBuilder.DropTable(
          name: "SavedCollection",
          schema: "app");

      migrationBuilder.DropTable(
          name: "SharedCollection",
          schema: "app");

      migrationBuilder.DropTable(
          name: "Collection",
          schema: "app");
    }
  }
}
