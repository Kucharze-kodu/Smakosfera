using Microsoft.EntityFrameworkCore;
using Smakosfera.DataAccess.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.ConstrainedExecution;
using System.Text;
using System.Threading.Tasks;
using Type = Smakosfera.DataAccess.Entities.Type;

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
        public DbSet<Type> Types { get; set; }
        public DbSet<RecipeType> Recipes_Types { get; set; }
        public DbSet<Report> Reports { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Like> Likes { get; set; }
        public DbSet<Rate> Rates { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Permission

            modelBuilder.Entity<Permission>()
                .HasIndex(r => r.Name)
                .IsUnique();

            // User

            modelBuilder.Entity<User>()
                .Property(r => r.Name)
                .IsRequired()
                .HasMaxLength(50);

            modelBuilder.Entity<User>()
                .Property(r => r.Surname)
                .IsRequired()
                .HasMaxLength(50);

            // Recipe

            modelBuilder.Entity<Recipe>()
                .HasIndex(i => i.Name)
                .IsUnique();

            // Ingredient

            modelBuilder.Entity<Ingredient>()
                .HasIndex(i => i.Name)
                .IsUnique();

            // Recipe Ingredient

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

            // Type

            modelBuilder.Entity<Type>()
                .HasIndex(r => r.Name)
                .IsUnique();

            // Recipe Type

            modelBuilder.Entity<RecipeType>()
                .HasOne(r => r.Recipe)
                .WithMany(r => r.Types)
                .HasForeignKey(r => r.RecipeId);

            modelBuilder.Entity<RecipeType>()
                .HasOne(r => r.Type)
                .WithMany(r => r.Recipes)
                .HasForeignKey(r => r.TypeId);

        }

    }
}
