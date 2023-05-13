// React's URL
using Microsoft.EntityFrameworkCore;
using Smakosfera.DataAccess.Repositories;
using Smakosfera.Services.Interfaces;
using Smakosfera.Services.services;
using Smakosfera.WebAPI.Controllers;

var frontend_url = "http://127.0.0.1:5173";

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

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddScoped<IRecipesService, RecipeService>();


// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<SmakosferaDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"),
    r => r.MigrationsAssembly("Smakosfera.WebAPI")));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseStaticFiles();

app.UseRouting();

app.UseCors(frontend_url);

app.UseAuthorization();

app.MapControllers();

app.Run();
