using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Data.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AgriculturalLands",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    FirstClass = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    SecondClass = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ThirdClass = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AgriculturalLands", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CommercialLands",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MarketValue = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CommercialLands", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "IndustrialLands",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MarketValue = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_IndustrialLands", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "ResidentialLands",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Name = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    MarketValue = table.Column<decimal>(type: "decimal(18,2)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ResidentialLands", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "TaxDecOfRealProperties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    TdNo = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Owner = table.Column<string>(type: "nvarchar(230)", maxLength: 230, nullable: false),
                    Address = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    PropertyLocation = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    PropertyIndentificationNo = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    ArpNo = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    TinNo = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    TelephoneNo = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    OctTctCloaNo = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    OctNo = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    Dated = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    SurveyLotNo = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false),
                    AssessorLotNo = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    BlkNo = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    KindOfPropertyAssessed = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: true),
                    NoOfStoreys = table.Column<string>(type: "nvarchar(10)", maxLength: 10, nullable: true),
                    BriefDescription = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    Specify = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: true),
                    TotalAssessedValueInWord = table.Column<string>(type: "nvarchar(230)", maxLength: 230, nullable: false),
                    TaxableExempt = table.Column<string>(type: "nvarchar(7)", maxLength: 7, nullable: false),
                    Quarter = table.Column<string>(type: "nvarchar(13)", maxLength: 13, nullable: false),
                    Year = table.Column<int>(type: "int", maxLength: 4, nullable: false),
                    RecommendedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ApprovedBy = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    Date = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DeclarationCancels = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    OwnerTdNoCancels = table.Column<string>(type: "nvarchar(230)", maxLength: 230, nullable: true),
                    PreviousAssessedValue = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    Memoranda = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: true),
                    ApprovedMessage = table.Column<string>(type: "nvarchar(230)", maxLength: 230, nullable: true),
                    Notes = table.Column<string>(type: "nvarchar(600)", maxLength: 600, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaxDecOfRealProperties", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "Boundaries",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    North = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    East = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    South = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    West = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: true),
                    TaxDecOfRealPropertyId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Boundaries", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Boundaries_TaxDecOfRealProperties_TaxDecOfRealPropertyId",
                        column: x => x.TaxDecOfRealPropertyId,
                        principalTable: "TaxDecOfRealProperties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "KindOfProperties",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Classification = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    Area = table.Column<double>(type: "float", nullable: false),
                    MarketValue = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    ActualUse = table.Column<string>(type: "nvarchar(90)", maxLength: 90, nullable: false),
                    Level = table.Column<double>(type: "float", nullable: false),
                    AssessedValue = table.Column<decimal>(type: "decimal(18,2)", nullable: false),
                    TaxDecOfRealPropertyId = table.Column<int>(type: "int", nullable: false),
                    AgriculturalLandId = table.Column<int>(type: "int", nullable: true),
                    CommercialLandId = table.Column<int>(type: "int", nullable: true),
                    IndustrialLandId = table.Column<int>(type: "int", nullable: true),
                    ResidentialLandId = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_KindOfProperties", x => x.Id);
                    table.ForeignKey(
                        name: "FK_KindOfProperties_TaxDecOfRealProperties_TaxDecOfRealPropertyId",
                        column: x => x.TaxDecOfRealPropertyId,
                        principalTable: "TaxDecOfRealProperties",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Photos",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Url = table.Column<string>(type: "nvarchar(230)", maxLength: 230, nullable: false),
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
                name: "IX_Boundaries_TaxDecOfRealPropertyId",
                table: "Boundaries",
                column: "TaxDecOfRealPropertyId",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_KindOfProperties_TaxDecOfRealPropertyId",
                table: "KindOfProperties",
                column: "TaxDecOfRealPropertyId");

            migrationBuilder.CreateIndex(
                name: "IX_Photos_TaxDecOfRealPropertyId",
                table: "Photos",
                column: "TaxDecOfRealPropertyId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "AgriculturalLands");

            migrationBuilder.DropTable(
                name: "Boundaries");

            migrationBuilder.DropTable(
                name: "CommercialLands");

            migrationBuilder.DropTable(
                name: "IndustrialLands");

            migrationBuilder.DropTable(
                name: "KindOfProperties");

            migrationBuilder.DropTable(
                name: "Photos");

            migrationBuilder.DropTable(
                name: "ResidentialLands");

            migrationBuilder.DropTable(
                name: "TaxDecOfRealProperties");
        }
    }
}
