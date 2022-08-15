using LifeJournalCore.Controllers.Database;
using LifeJournalCore.DTO;
using LifeJournalCore.Model;
using Microsoft.AspNetCore.Mvc;
using NHibernate;
using static LifeJournalCore.DTO.GoalEntryGetDTO;

namespace LifeJournalCore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GoalEntryService : ControllerBase
    {
       

        private readonly ILogger<GoalEntryService> _logger;

        public GoalEntryService(ILogger<GoalEntryService> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GoalEntryService")]
        public GoalEntryGetDTO Get([FromQuery] GoalEntryGetRequestDTO goalEntryGetRequestDTO)
        {
            var response = new GoalEntryGetDTO();
            var goalEntries = new List<GoalEntryPostDTO>();
            NHibernate.ISession session = NHibernateHelper.GetCurrentSession();
            try
            {
                using (ITransaction tx = session.BeginTransaction())
                {
                    goalEntries = session.Query<GoalEntry>()
                        .Where(x => x.GoalPlan.Id == goalEntryGetRequestDTO.GoalId)
                        .OrderByDescending(x => x.DateForEntry)
                        .Select(x => new GoalEntryPostDTO(x)).ToList();

                    if (goalEntryGetRequestDTO.AmmountToTake != 0)
                    {
                        goalEntries = goalEntries.Take(goalEntryGetRequestDTO.AmmountToTake).ToList();
                        response.WeekDaysStats = goalEntries.GroupBy(x => x.EntryDate.DayOfWeek).Select(x => new WeekDayStats()
                        {
                            DayOfWeek = x.Key,
                            TimeSum = x.Sum(x => x.Time),
                            Entries = x.Count(),

                        }).OrderBy(x => x.DayOfWeek);
                        response.Goals = goalEntries; 
                        
                    }

                }
            }
            finally
            {
                NHibernateHelper.CloseSession();
            }
            return response;
        }

        [HttpPost(Name = "GoalEntryService")]
        public bool Post(GoalEntryPostDTO goalPostDTO)
        {
            GoalEntry goalEntry = new GoalEntry(goalPostDTO);
            NHibernate.ISession session = NHibernateHelper.GetCurrentSession();
            try
            {
                using (ITransaction tx = session.BeginTransaction())
                {
                    goalEntry.GoalPlan = session.Get<Goal>(goalPostDTO.GoalId);
                    session.SaveOrUpdate(goalEntry);
                    tx.Commit();
                }
                return true;
            }
            catch (Exception ex)
            {
                NHibernateHelper.CloseSession();
            }
            return false;
        }


    }
}