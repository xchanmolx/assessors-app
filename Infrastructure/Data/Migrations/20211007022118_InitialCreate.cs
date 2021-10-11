using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Data.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "TaxDecOfRealProperties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OwnerName = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    PropertyLocation = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    TaxDecNumber = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    EffectiveYear = table.Column<int>(type: "int", maxLength: 13, nullable: false),
                    SurveyLotNumber = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    LandArea = table.Column<double>(type: "float", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true, comment: "e.g. General Revision"),
                    PropertyIndex = table.Column<string>(type: "nvarchar(33)", maxLength: 33, nullable: false),
                    ARPNumber = table.Column<string>(type: "nvarchar(33)", maxLength: 33, nullable: false),
                    OwnerAddress = table.Column<string>(type: "nvarchar(255)", maxLength: 255, nullable: false),
                    Kind = table.Column<string>(type: "nvarchar(33)", maxLength: 33, nullable: false),
                    Class = table.Column<string>(type: "nvarchar(33)", maxLength: 33, nullable: false),
                    AssessedValue = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    PreviousTDNumber = table.Column<string>(type: "nvarchar(33)", maxLength: 33, nullable: false),
                    PreviousAV = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TaxableExempt = table.Column<string>(type: "nvarchar(33)", maxLength: 33, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaxDecOfRealProperties", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Url = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    TaxDecOfRealPropertyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Photos", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Photos_TaxDecOfRealProperties_TaxDecOfRealPropertyId",
                        column: x => x.TaxDecOfRealPropertyId,
                        principalTable: "TaxDecOfRealProperties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Photos_TaxDecOfRealPropertyId",
                table: "Photos",
                column: "TaxDecOfRealPropertyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DropTable(
                name: "TaxDecOfRealProperties");
        }
    }
}
