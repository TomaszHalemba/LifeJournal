using LifeJournalCore.Controllers.Database;
using LifeJournalCore.DTO;
using LifeJournalCore.Model;
using Microsoft.AspNetCore.Mvc;
using NHibernate;

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
        public IEnumerable<GoalEntryPostDTO> Get([FromQuery] GoalEntryGetRequestDTO goalEntryGetRequestDTO)
        {
            var list = new List<GoalEntryPostDTO>();
            NHibernate.ISession session = NHibernateHelper.GetCurrentSession();
            try
            {
                using (ITransaction tx = session.BeginTransaction())
                {
                    list = session.Query<GoalEntry>()
                        .Where(x => x.GoalPlan.Id == goalEntryGetRequestDTO.GoalId)
                        .OrderByDescending(x => x.DateForEntry)
                        .Select(x => new GoalEntryPostDTO(x)).ToList();

                    if (goalEntryGetRequestDTO.AmmountToTake != 0)
                    {
                        list = list.Take(goalEntryGetRequestDTO.AmmountToTake).ToList();
                    }

                }
            }
            finally
            {
                NHibernateHelper.CloseSession();
            }
            return list;
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
                    goalEntry.GoalPlan = session.Get<Goal>(goalPostDTO.Id);
                    session.Save(goalEntry);
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