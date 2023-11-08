using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace TeleBan.Migrations
{
    /// <inheritdoc />
    public partial class AddConversationGuid : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsDM",
                table: "Conversations");

            migrationBuilder.AddColumn<Guid>(
                name: "ConversationGuid",
                table: "Conversations",
                type: "TEXT",
                nullable: false,
                defaultValue: new Guid("00000000-0000-0000-0000-000000000000"));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "ConversationGuid",
                table: "Conversations");

            migrationBuilder.AddColumn<bool>(
                name: "IsDM",
                table: "Conversations",
                type: "INTEGER",
                nullable: false,
                defaultValue: false);
        }
    }
}
