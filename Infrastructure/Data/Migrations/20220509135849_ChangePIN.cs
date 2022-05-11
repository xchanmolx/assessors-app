using Microsoft.EntityFrameworkCore.Migrations;

namespace Infrastructure.Data.Migrations
{
    public partial class ChangePIN : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PropertyIndentificationNo",
                table: "TaxDecOfRealProperties",
                newName: "PropertyIdentificationNo");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameColumn(
                name: "PropertyIdentificationNo",
                table: "TaxDecOfRealProperties",
                newName: "PropertyIndentificationNo");
        }
    }
}
