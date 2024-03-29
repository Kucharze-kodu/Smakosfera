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
using System.Configuration;
using ConfigurationManager = Microsoft.Extensions.Configuration.ConfigurationManager;


// var frontend_url = "http://localhost:5173";

var builder = WebApplication.CreateBuilder(args);

var frontendUrl = builder.Configuration.GetSection("Url").GetSection("URLFrontend").Value;
// Configure the Cors policy
builder.Services.AddCors(options =>
{
    options.AddPolicy( "frontend",
        policy =>
        {
            policy.WithOrigins(frontendUrl).AllowAnyMethod().AllowAnyHeader();
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





// Add services to the container.
builder.Services.AddControllers();

builder.Services.AddScoped<ILikeService, LikeService>();
builder.Services.AddScoped<ICommentService, CommentService>();
builder.Services.AddScoped<IRecipesService, RecipeService>();
builder.Services.AddScoped<IIngredientService, IngredientService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<INewsletterService, NewsletterService>();
builder.Services.AddScoped<IRateService, RateService>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SmakosferaDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DbConnection"),
    r => r.MigrationsAssembly("Smakosfera.WebAPI")));


builder.Services.AddScoped<SmakosferaSeeder>();
builder.Services.AddScoped<IAccountService, AccountService>();
builder.Services.AddScoped<IEmailService, EmailService>();
builder.Services.AddScoped<ErrorHandlingMiddleware>();
//builder.Services.AddScoped<NewsletterMiddleware>();
builder.Services.AddScoped<IUserContextService, UserContextService>();
builder.Services.AddHttpContextAccessor();

var app = builder.Build();

// Configure the HTTP request pipeline.
app.UseSwagger();
app.UseSwaggerUI();

var scope = app.Services.CreateScope();
var seeder = scope.ServiceProvider.GetRequiredService<SmakosferaSeeder>();
seeder.Seed();
app.UseMiddleware<ErrorHandlingMiddleware>();
//app.UseMiddleware<NewsletterMiddleware>();

app.UseAuthentication();

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseCors("frontend");

app.UseAuthorization();

app.MapControllers();

app.Run();

