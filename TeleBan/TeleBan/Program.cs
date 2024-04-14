using Keycloak.AuthServices.Authentication;
using Microsoft.EntityFrameworkCore;
using TeleBan.Data;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();
builder.Services.AddAuthorization();
builder.Services.AddHttpLogging(o => { });
builder.Services.AddKeycloakAuthentication(builder.Configuration, o =>
{
    o.RequireHttpsMetadata = false;
});
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlite("Data Source=conferences.db"));
builder.Services
    .AddGraphQLServer()
    .AddAuthorization()
    .AddTypes()
    .AddInMemorySubscriptions()
    .RegisterDbContext<ApplicationDbContext>()
    .AddFiltering();
    


var app = builder.Build();
app.UseHttpLogging();
app.UseCors(builder => builder.AllowAnyOrigin()
    .AllowAnyMethod()
    .AllowAnyHeader()
);
app.UseWebSockets();
app.MapGraphQL();
app.MapGet("/health", () => "Healthy");

app.RunWithGraphQLCommands(args);
