using FluentNHibernate.Conventions;
using LifeJournalCore.Controllers.Database;
using LifeJournalCore.DTO;
using LifeJournalCore.Model;
using Microsoft.AspNetCore.Mvc;
using NHibernate;
using System.Linq;
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

                    var query = session.Query<GoalEntry>()
                        .Where(x => x.GoalPlan.Id == goalEntryGetRequestDTO.GoalId);

                    if (goalEntryGetRequestDTO.StartDateDate != DateTime.MinValue)
                        query = query.Where(x => x.DateForEntry > goalEntryGetRequestDTO.StartDateDate.Date);
                    if (goalEntryGetRequestDTO.EndDateDate != DateTime.MaxValue)
                        query = query.Where(x => x.DateForEntry <= goalEntryGetRequestDTO.EndDateDate.Date);
                        

                    goalEntries = query.OrderByDescending(x => x.DateForEntry)
                        .Select(x => new GoalEntryPostDTO(x)).ToList();

                    if (goalEntries.IsNotEmpty())
                    {
                        goalEntries = goalEntries.ToList();
                        response.WeekDaysStats = goalEntries.GroupBy(x => x.EntryDate.DayOfWeek).Select(x => new WeekDayStats()
                        {
                            DayOfWeek = x.Key,
                            TimeSum = x.Sum(x => x.Time),
                            Entries = x.Count(),
                            maxTime = x.Max(x => x.Time),
                            minTime = x.Min(x => x.Time)

                        }).OrderBy(x => x.DayOfWeek);
                        response.MonthsStats = goalEntries.GroupBy(x => x.EntryDate.Month).Select(x => new MonthStats()
                        {
                            Month = x.Key,
                            TimeSum = x.Sum(x => x.Time),
                            Entries = x.Count(),
                            maxTime = x.Max(x => x.Time),
                            minTime = x.Min(x => x.Time)

                        }).OrderBy(x => x.Month);
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