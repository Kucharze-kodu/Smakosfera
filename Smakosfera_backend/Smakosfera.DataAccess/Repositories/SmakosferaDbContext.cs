using Microsoft.EntityFrameworkCore;
using Smakosfera.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.DataAccess.Repositories
{
    public class SmakosferaDbContext : DbContext
    {
        public SmakosferaDbContext(DbContextOptions<SmakosferaDbContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<Permission> Permissions { get; set; }

        public DbSet<Recipe> Recipes { get; set; }
        public DbSet<DifficultyLevel> Difficulty_Levels { get; set; }

        public DbSet<Ingredient> Ingredients { get; set; }
        public DbSet<RecipeIngredient> Recipes_Ingredients { get; set; }

/*        public DbSet<Recipetype> Recipetypes { get; set; }
        public DbSet<EnumType> EnumTypes { get; set; }*/


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<User>()
                .Property(r => r.Name)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<User>()
                .Property(r => r.Surname)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<Recipe>()
                .HasIndex(i => i.Name)
                .IsUnique();

            modelBuilder.Entity<Ingredient>()
                .HasIndex(i => i.Name)
                .IsUnique();

            modelBuilder.Entity<RecipeIngredient>()
                .HasKey(ri => ri.RecipeIngredientId);

            modelBuilder.Entity<RecipeIngredient>()
                .HasOne(ri => ri.Recipe)
                .WithMany(r => r.Ingredients)
                .HasForeignKey(ri => ri.RecipeId);

            modelBuilder.Entity<RecipeIngredient>()
                .HasOne(ri => ri.Ingredient)
                .WithMany(i => i.Recipes)
                .HasForeignKey(ri => ri.IngredientId);
        }

    }
}
