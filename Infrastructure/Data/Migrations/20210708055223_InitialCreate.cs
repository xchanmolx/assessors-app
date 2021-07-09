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
                    PictureUrl = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Remarks = table.Column<string>(type: "nvarchar(max)", nullable: true, comment: "e.g. General Revision")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_TaxDecOfRealProperties", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "TaxDecOfRealProperties");
        }
    }
}
