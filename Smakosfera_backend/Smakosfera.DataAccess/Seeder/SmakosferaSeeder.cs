using Smakosfera.DataAccess.Entities;
using Smakosfera.DataAccess.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Smakosfera.DataAccess.Seeder
{
    public class SmakosferaSeeder
    {
        private readonly SmakosferaDbContext _dbContext;

        public SmakosferaSeeder(SmakosferaDbContext dbContext)
        {
            _dbContext = dbContext;
        }

        public void Seed()
        {
            if (_dbContext.Database.CanConnect())
            {

                if (!_dbContext.Permissions.Any())
                {
                    var permissions = GetPermissions();
                    _dbContext.Permissions.AddRange(permissions);
                    _dbContext.SaveChanges();
                }

                if (!_dbContext.Difficulty_Levels.Any())
                {
                    var dificultyLevel = GetDificultyLevels();
                    _dbContext.Difficulty_Levels.AddRange(dificultyLevel);
                    _dbContext.SaveChanges();
                }
                if (!_dbContext.EnumTypes.Any())
                {
                    var enumTypes = GetEnumTypes();
                    _dbContext.EnumTypes.AddRange(enumTypes);
                    _dbContext.SaveChanges();
                }
            
            }
        }

        private IEnumerable<Permission> GetPermissions()
        {
            var permissions = new List<Permission>()
            {
                new Permission()
                {
                    Name = "User"
                },

                new Permission()
                {
                    Name = "Moderator"
                },

                new Permission()
                {
                    Name = "Admin"
                }
            };

            return permissions;
        }


        private IEnumerable<DifficultyLevel> GetDificultyLevels()
        {
            var dificultyLevels = new List<DifficultyLevel>()
            {
                new DifficultyLevel()
                {
                    Name = "very easy"
                },

                new DifficultyLevel()
                {
                    Name = "easy"
                },

                new DifficultyLevel()
                {
                    Name = "medium"
                },
                new DifficultyLevel()
                {
                    Name = "hard"
                },
                new DifficultyLevel()
                {
                    Name = "very hard"
                }
            };

            return dificultyLevels;

        }

        private IEnumerable<EnumType> GetEnumTypes()
        {
            var enumTypes = new List<EnumType>()
            {
                new EnumType()
                {
                    Name = "vegetarian"
                },

                new EnumType()
                {
                    Name = "vegan"
                },

                new EnumType()
                {
                    Name = "meat"
                },
                new EnumType()
                {
                    Name = "fast food"
                },
                new EnumType()
                {
                    Name = "other"
                }
            };

            return enumTypes;

        }
    }
}
