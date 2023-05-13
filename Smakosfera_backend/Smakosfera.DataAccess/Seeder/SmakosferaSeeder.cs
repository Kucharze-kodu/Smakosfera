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

                if (!_dbContext.Dificulty_Levels.Any())
                {
                    var dificultyLevel = GetDificultyLevels();
                    _dbContext.Dificulty_Levels.AddRange(dificultyLevel);
                    _dbContext.SaveChanges();
                }
            }
        }

       
        private IEnumerable<DificultyLevel> GetDificultyLevels()
        {
            var dificultyLevels = new List<DificultyLevel>()
            {
                new DificultyLevel()
                {
                    Name = "very easy"
                },

                new DificultyLevel()
                {
                    Name = "easy"
                },

                new DificultyLevel()
                {
                    Name = "medium"
                },
                new DificultyLevel()
                {
                    Name = "hard"
                },
                new DificultyLevel()
                {
                    Name = "very hard"
                }
            };

            return dificultyLevels;
        }
    }
}
