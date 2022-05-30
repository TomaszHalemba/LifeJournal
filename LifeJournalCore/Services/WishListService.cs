using LifeJournalCore.Controllers.Database;
using LifeJournalCore.DTO;
using LifeJournalCore.Model;
using Microsoft.AspNetCore.Mvc;
using NHibernate;

namespace LifeJournalCore.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class WishlistService : ControllerBase
    {
        private readonly ILogger<WishlistService> _logger;

        public WishlistService(ILogger<WishlistService> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "WishListService")]
        public IEnumerable<WishlistItemServiceGetDTO> Get()
        {
            var list = new List<WishlistItemServiceGetDTO>();
            NHibernate.ISession session = NHibernateHelper.GetCurrentSession();
            try
            {
                using (ITransaction tx = session.BeginTransaction())
                {
                    list = session.Query<WishlistItem>().Select(x => WishlistItemServiceGetDTO.CreateWishlistItemServiceGetDTO(x)).ToList();
                }
            }
            finally
            {
                NHibernateHelper.CloseSession();
            }
            return list;
        }        

        [HttpPost(Name = "WishListService")]
        public bool Post(WishlistItemServiceGetDTO wishlistItem)
        {
            WishlistItem wishlistItemAdded = new WishlistItem(wishlistItem);
            NHibernate.ISession session = NHibernateHelper.GetCurrentSession();
            try
            {
                List<WishlistCategory> OldCategories = new List<WishlistCategory>();
                var itemNamesList = wishlistItemAdded.Categories.Select(y => y.Name).ToList();
                using (ITransaction tx = session.BeginTransaction())
                {
                    OldCategories  = session.Query<WishlistCategory>().Where(x => itemNamesList.Contains(x.Name)).ToList();
                }
                if (OldCategories.Count > 0)
                {
                    OldCategories.ForEach(x => wishlistItemAdded.Categories.Add(x));
                    wishlistItemAdded.Categories = wishlistItemAdded.Categories.GroupBy(x => x.Name).Select(x => x.Last()).ToList();
                }
                
            }
            catch (Exception ex)
            {
                NHibernateHelper.CloseSession();
            }

            try
            {
                using (ITransaction tx = session.BeginTransaction())
                {
                    session.Save(wishlistItemAdded);
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