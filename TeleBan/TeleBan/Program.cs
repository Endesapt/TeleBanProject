using Keycloak.AuthServices.Authentication;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddAuthorization();
builder.Services.AddKeycloakAuthentication(builder.Configuration, o =>
{
    o.RequireHttpsMetadata = false;
});
builder.Services
    .AddGraphQLServer()
    .AddAuthorization()
    .AddTypes();

var app = builder.Build();

app.UseWebSockets();
app.MapGraphQL();

app.RunWithGraphQLCommands(args);
