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
    o.TokenValidationParameters = new()
    {
        ValidateIssuer = false,
        ValidateAudience=false,
        ValidateLifetime=true,
    };
});
builder.Services.AddDbContext<ApplicationDbContext>(options => {
    var str = builder.Configuration["DBConnectionString"];
    options.UseMySQL(str);
}
);
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

using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetService<ApplicationDbContext>();
    dbContext.Database.Migrate();
}

app.RunWithGraphQLCommands(args);
