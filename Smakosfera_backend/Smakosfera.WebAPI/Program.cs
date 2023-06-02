// React's URL
using Microsoft.EntityFrameworkCore;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Services;
using Smakosfera.Services.Interfaces;
using Smakosfera.DataAccess.Seeder;
using Smakosfera.WebAPI.Middlewares;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using Smakosfera.Services.Settings;
using Microsoft.AspNetCore.Authorization;


var frontend_url = "http://localhost:5173";

var builder = WebApplication.CreateBuilder(args);

// Configure the Cors policy
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: frontend_url,
        policy =>
        {
            policy.WithOrigins(frontend_url).AllowAnyMethod().AllowAnyHeader();
        });
});

// Configure Authentication
var authenticationSettings = new AuthenticationSettings();

builder.Configuration.GetSection("Authentication").Bind(authenticationSettings);

builder.Services.AddSingleton(authenticationSettings);

builder.Services.AddAuthentication(options =>
{
    options.DefaultAuthenticateScheme = "Bearer";
    options.DefaultScheme = "Bearer";
    options.DefaultChallengeScheme = "Bearer";
}).AddJwtBearer(x =>
{
    x.RequireHttpsMetadata = false;
    x.SaveToken = true;
    x.TokenValidationParameters = new TokenValidationParameters
    {
        ValidIssuer = authenticationSettings.JwtIssuer,
        ValidAudience = authenticationSettings.JwtIssuer,
        IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationSettings.JwtKey))
    };
});

// Add URL Host 
var urlBackend = new HostSettings();

//urlBackend.Url = builder.Configuration.GetSection("Host").GetSection("URL").Value; // (COMMENT THIS IN DEVELOPMENT)
urlBackend.Url = builder.Configuration.GetSection("Host").GetSection("URLBackend").Value; // (COMMENT THIS IN HOSTING)
builder.Services.AddSingleton(urlBackend);



// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddScoped<ICommentService, CommentService>();
builder.Services.AddScoped<IRecipesService, RecipeService>();
builder.Services.AddScoped<IIngredientService, IngredientService>();
builder.Services.AddScoped<IRecipeIngredientService, RecipeIngredientService>();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SmakosferaDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"),
    r => r.MigrationsAssembly("Smakosfera.WebAPI")));


builder.Services.AddScoped<SmakosferaSeeder>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<ErrorHandlingMiddleware>();
builder.Services.AddScoped<IUserContextService, UserContextService>();
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

var scope = app.Services.CreateScope();
var seeder = scope.ServiceProvider.GetRequiredService<SmakosferaSeeder>();
seeder.Seed();
app.UseMiddleware<ErrorHandlingMiddleware>();

app.UseAuthentication();

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseCors(frontend_url);

app.UseAuthorization();

app.MapControllers();

app.Run();
