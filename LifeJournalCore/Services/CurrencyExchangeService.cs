using LifeJournalCore.Controllers.Database;
using LifeJournalCore.DTO;
using LifeJournalCore.Model;
using Microsoft.AspNetCore.Mvc;
using NHibernate;

namespace LifeJournalCore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CurrencyExchangeService : ControllerBase
    {
       

        private readonly ILogger<CurrencyExchangeService> _logger;

        public CurrencyExchangeService(ILogger<CurrencyExchangeService> logger)
        {
            _logger = logger;
        }


        [HttpPost(Name = "CurrencyExchangeService")]
        public bool Post(CurrencyExchangeAddDTO currencyExchangeAddDTO)
        {
            //var goalDetailsDTO = new GoalDetailsDTO();
            CurrencyExchange currencyExchange = new CurrencyExchange(currencyExchangeAddDTO);

            NHibernate.ISession session = NHibernateHelper.GetCurrentSession();
            try
            {
                using (ITransaction tx = session.BeginTransaction())
                {
                    currencyExchange.CurrencyRecived = session.Get<Currency>(currencyExchangeAddDTO.CurrencyRecivedId);
                    currencyExchange.CurrencySent = session.Get<Currency>(currencyExchangeAddDTO.CurrencySentId);

                    currencyExchange.AccountDestination = session.Get<Account>(currencyExchangeAddDTO.AccountRecivedId);
                    currencyExchange.AccountSent = session.Get<Account>(currencyExchangeAddDTO.AccountSentId);
                    session.Save(currencyExchange);
                    tx.Commit();
                }
                return true;
            }
            catch (Exception ex)
            {
                NHibernateHelper.CloseSession();
            }
            return false;
            //Goal goal = new Goal();
            //NHibernate.ISession session = NHibernateHelper.GetCurrentSession();
            //try
            //{
            //    using (ITransaction tx = session.BeginTransaction())
            //    {
            //        goal = session.Get<Goal>(id);
            //    }
            //}
            //finally
            //{
            //    NHibernateHelper.CloseSession();
            //}
            //goalDetailsDTO.StartDate = goal.StartDate;
            //goalDetailsDTO.EndDate = goal.EndDate;
            //goalDetailsDTO.RepetitionGoal = goal.RepetitionGoal;
            //goalDetailsDTO.Description = goal.Description;
            //goalDetailsDTO.TimeReached = (long?)goal.Entries.Sum(x => x.TimeOfEntry?.TotalSeconds ?? 0);
            //goalDetailsDTO.Time = (long?)(goal.TimeSpanGoal?.TotalSeconds);
            //goalDetailsDTO.RepetitionGoalDone = (int?)goal.Entries.Sum(x => x.NumberOfRepetition ?? 0);
            return true;
        }

        


    }
}