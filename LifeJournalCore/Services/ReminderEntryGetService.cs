using LifeJournalCore.Controllers.Database;
using LifeJournalCore.DTO;
using LifeJournalCore.Model;
using Microsoft.AspNetCore.Mvc;
using NHibernate;

namespace LifeJournalCore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ReminderEntryGetService : ControllerBase
    {
       

        private readonly ILogger<ReminderEntryGetService> _logger;

        public ReminderEntryGetService(ILogger<ReminderEntryGetService> logger)
        {
            _logger = logger;
        }


        [HttpGet(Name = "ReminderEntryGetService")]
        public List<ReminderEntryGetDTO> Get()
        {
            List<ReminderEntryGetDTO> reminderEntries = new List<ReminderEntryGetDTO>();
            NHibernate.ISession session = NHibernateHelper.GetCurrentSession();
            try
            {
                using (ITransaction tx = session.BeginTransaction())
                {
                    reminderEntries = session.Query<ReminderEntry>().OrderBy(x => x.ReminderDate).Select(x => new ReminderEntryGetDTO(x)).ToList();
                }
            }
            finally
            {
                NHibernateHelper.CloseSession();
            }
            
            return reminderEntries;
        }


        [HttpPut(Name = "ReminderEntryGetService")]
        public bool Put([FromBody] int idEntry)
        {
            NHibernate.ISession session = NHibernateHelper.GetCurrentSession();
            try
            {
                using (ITransaction tx = session.BeginTransaction())
                {
                    var entry = session.Get<ReminderEntry>(idEntry);
                    entry.IsDone = !entry.IsDone;
                    session.Save(entry);
                    tx.Commit();
                }
            }
            finally
            {
                NHibernateHelper.CloseSession();
            }
            return true;
        }

        [HttpPost(Name = "ReminderEntryGetService")]
        public bool Post(ReminderEntryGetDTO goalPostDTO)
        {
            ReminderEntry goal = new ReminderEntry(goalPostDTO);
            NHibernate.ISession session = NHibernateHelper.GetCurrentSession();
            try
            {
                using (ITransaction tx = session.BeginTransaction())
                {
                    session.Save(goal);
                    tx.Commit();
                }
            }
            finally
            {
                NHibernateHelper.CloseSession();
            }
            return true;
        }




    }
}