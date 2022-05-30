using LifeJournalCore.Controllers.Database;
using LifeJournalCore.DTO;
using LifeJournalCore.Model;
using Microsoft.AspNetCore.Mvc;
using NHibernate;

namespace LifeJournalCore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class GoalService : ControllerBase
    {
       

        private readonly ILogger<GoalService> _logger;

        public GoalService(ILogger<GoalService> logger)
        {
            _logger = logger;
        }


        [HttpGet(Name = "GoalService")]
        public IEnumerable<GoalListGetDTO> Get()
        {
            var list = new List<GoalListGetDTO>();
            NHibernate.ISession session = NHibernateHelper.GetCurrentSession();
            try
            {
                using (ITransaction tx = session.BeginTransaction())
                {
                    list = session.Query<Goal>().Select(x => new GoalListGetDTO(x)).ToList();
                }
            }
            finally
            {
                NHibernateHelper.CloseSession();
            }
            return list;
        }

        [HttpPost(Name = "GoalService")]
        public bool Post(GoalPostDTO goalPostDTO)
        {
            Goal goal = new Goal(goalPostDTO);
            NHibernate.ISession session = NHibernateHelper.GetCurrentSession();
            try
            {
                using (ITransaction tx = session.BeginTransaction())
                {
                    session.Save(goal);
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