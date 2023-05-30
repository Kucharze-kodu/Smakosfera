﻿using Smakosfera.DataAccess.Entities;
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
                    var difficultyLevel = GetDifficultyLevels();
                    _dbContext.Difficulty_Levels.AddRange(difficultyLevel);

                    _dbContext.SaveChanges();
                }
               /* if (!_dbContext.EnumTypes.Any())
                {
                    var enumTypes = GetEnumTypes();
                    _dbContext.EnumTypes.AddRange(enumTypes);
                    _dbContext.SaveChanges();
                }*/
            
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


        private IEnumerable<DifficultyLevel> GetDifficultyLevels()
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

        private IEnumerable<Entities.Type> GetEnumTypes()
        {
            var enumTypes = new List<Entities.Type>()
            {
                new Entities.Type()
                {
                    Name = "vegetarian"
                },

                new Entities.Type()
                {
                    Name = "vegan"
                },

                new Entities.Type()
                {
                    Name = "meat"
                },
                new Entities.Type()
                {
                    Name = "fast food"
                },
                new Entities.Type()
                {
                    Name = "other"
                }
            };

            return enumTypes;

        }
    }
}
