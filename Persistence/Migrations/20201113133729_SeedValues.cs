using Microsoft.EntityFrameworkCore.Migrations;

namespace Persistence.Migrations
{
    public partial class SeedValues : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "id", "firstName", "phoneNumbers", "surname" },
                values: new object[] { 1, "Pawel", "502689909", "Labuz" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "id", "firstName", "phoneNumbers", "surname" },
                values: new object[] { 2, "Jan", "702689909", "Kowalski" });

            migrationBuilder.InsertData(
                table: "Values",
                columns: new[] { "id", "firstName", "phoneNumbers", "surname" },
                values: new object[] { 3, "Adam", "802689909", "Malysz" });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "id",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Values",
                keyColumn: "id",
                keyValue: 3);
        }
    }
}
