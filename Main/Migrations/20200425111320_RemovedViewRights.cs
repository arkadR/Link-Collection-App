using Microsoft.EntityFrameworkCore.Migrations;

namespace LinkCollectionApp.Migrations
{
    public partial class RemovedViewRights : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CreatedElements",
                schema: "app");

            migrationBuilder.DropColumn(
                name: "ViewRights",
                schema: "app",
                table: "SharedCollections");

            migrationBuilder.AlterColumn<bool>(
                name: "EditRights",
                schema: "app",
                table: "SharedCollections",
                nullable: false,
                oldClrType: typeof(bool),
                oldType: "bit",
                oldNullable: true,
                oldDefaultValueSql: "((0))");

            migrationBuilder.CreateTable(
                name: "Elements",
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
                    table.PrimaryKey("PK_Elements", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Element__Collect__4E88ABD4",
                        column: x => x.CollectionId,
                        principalSchema: "app",
                        principalTable: "Collections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__Element__OwnerId__4F7CD00D",
                        column: x => x.OwnerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Elements_CollectionId",
                schema: "app",
                table: "Elements",
                column: "CollectionId");

            migrationBuilder.CreateIndex(
                name: "IX_Elements_OwnerId",
                schema: "app",
                table: "Elements",
                column: "OwnerId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Elements",
                schema: "app");

            migrationBuilder.AlterColumn<bool>(
                name: "EditRights",
                schema: "app",
                table: "SharedCollections",
                type: "bit",
                nullable: true,
                defaultValueSql: "((0))",
                oldClrType: typeof(bool));

            migrationBuilder.AddColumn<bool>(
                name: "ViewRights",
                schema: "app",
                table: "SharedCollections",
                type: "bit",
                nullable: true,
                defaultValueSql: "((1))");

            migrationBuilder.CreateTable(
                name: "CreatedElements",
                schema: "app",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CollectionId = table.Column<int>(type: "int", nullable: false),
                    Description = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: true),
                    Link = table.Column<string>(type: "varchar(255)", unicode: false, maxLength: 255, nullable: false),
                    Name = table.Column<string>(type: "varchar(100)", unicode: false, maxLength: 100, nullable: true),
                    OwnerId = table.Column<string>(type: "nvarchar(450)", maxLength: 450, nullable: false),
                    Sequence = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CreatedElements", x => x.Id);
                    table.ForeignKey(
                        name: "FK__Element__Collect__4E88ABD4",
                        column: x => x.CollectionId,
                        principalSchema: "app",
                        principalTable: "Collections",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                    table.ForeignKey(
                        name: "FK__Element__OwnerId__4F7CD00D",
                        column: x => x.OwnerId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Restrict);
                });

            migrationBuilder.CreateIndex(
                name: "IX_CreatedElements_CollectionId",
                schema: "app",
                table: "CreatedElements",
                column: "CollectionId");

            migrationBuilder.CreateIndex(
                name: "IX_CreatedElements_OwnerId",
                schema: "app",
                table: "CreatedElements",
                column: "OwnerId");
        }
    }
}
