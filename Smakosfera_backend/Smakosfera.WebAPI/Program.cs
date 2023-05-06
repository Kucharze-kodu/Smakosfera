// React's URL
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

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

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
