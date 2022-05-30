using LifeJournalCore.Controllers.Database;
using LifeJournalCore.DTO;
using LifeJournalCore.Model;
using Microsoft.AspNetCore.Mvc;
using NHibernate;

namespace LifeJournalCore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GoalDetailsService : ControllerBase
    {
       

        private readonly ILogger<GoalDetailsService> _logger;

        public GoalDetailsService(ILogger<GoalDetailsService> logger)
        {
            _logger = logger;
        }


        [HttpGet(Name = "GoalDetailsService")]
        public GoalDetailsDTO Get(int id)
        {
            var goalDetailsDTO = new GoalDetailsDTO();
            Goal goal = new Goal();
            NHibernate.ISession session = NHibernateHelper.GetCurrentSession();
            try
            {
                using (ITransaction tx = session.BeginTransaction())
                {
                    goal = session.Get<Goal>(id);
                }
            }
            finally
            {
                NHibernateHelper.CloseSession();
            }
            goalDetailsDTO.StartDate = goal.StartDate;
            goalDetailsDTO.EndDate = goal.EndDate;
            goalDetailsDTO.RepetitionGoal = goal.RepetitionGoal;
            goalDetailsDTO.Description = goal.Description;
            goalDetailsDTO.TimeReached = (long?)goal.Entries.Sum(x => x.TimeOfEntry?.TotalSeconds ?? 0);
            goalDetailsDTO.Time = (long?)(goal.TimeSpanGoal?.TotalSeconds);
            goalDetailsDTO.RepetitionGoalDone = (int?)goal.Entries.Sum(x => x.NumberOfRepetition ?? 0);
            return goalDetailsDTO;
        }

        


    }
}