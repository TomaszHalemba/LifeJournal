using FluentNHibernate.Cfg;
using FluentNHibernate.Cfg.Db;
using LifeJournalCore.Model;
using NHibernate;
using NHibernate.Tool.hbm2ddl;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace LifeJournalCore.Controllers.Database
{
    class NHibernateHelper
    {
        private const string CurrentSessionKey = "nhibernate.current_session";
        private static readonly ISessionFactory _sessionFactory;
        static NHibernateHelper()
        {
            _sessionFactory = FluentConfigure();
            //AddNewDbtest1();
        }
        public static NHibernate.ISession GetCurrentSession()
        {
            return _sessionFactory.OpenSession();
        }
        public static void CloseSession()
        {
            _sessionFactory.Close();
        }
        public static void CloseSessionFactory()
        {
            if (_sessionFactory != null)
            {
                _sessionFactory.Close();
            }
        }

       


        public static ISessionFactory FluentConfigure()
        {



            return Fluently.Configure()
                //which database
                .Database(
                    PostgreSQLConfiguration.Standard
                        .ConnectionString(
                            "User ID = postgres; Password = qwerty; Host = localhost; Port = 5432; Database = postgres;") //connection string from app.config
                                                                                                     //.ShowSql()
                        )
                //2nd level cache
                .Cache(
                    c => c.UseQueryCache()
                        .UseSecondLevelCache()
                        .ProviderClass<NHibernate.Cache.HashtableCacheProvider>())
                   //find/set the mappings
                   //.Mappings(m => m.FluentMappings.AddFromAssemblyOf<CustomerMapping>())
                   .ExposeConfiguration(cfg => new SchemaExport(cfg).Execute(true, false, false))
                .Mappings(m => m.FluentMappings.AddFromAssembly(Assembly.GetExecutingAssembly()))
                .BuildSessionFactory();



            

        }
    }
}


//static void AddNewDbtest1()
//{
//    WishlistCategory category = new WishlistCategory()
//    {
//        Name = "Nintendo"
//    };
//    WishlistCategory category1 = new WishlistCategory()
//    {
//        Name = "gry"
//    };
//    WishlistCategory categor2 = new WishlistCategory()
//    {
//        Name = "Rękawiczki"
//    };

//    WishlistItem wishlistItem = new WishlistItem()
//    {
//        Name = "Mario 1",
//        Categories = new List<WishlistCategory>() { category, category1 }
//    };
//    WishlistItem wishlistItem1 = new WishlistItem()
//    {
//        Name = "zelda 1",
//        Categories = new List<WishlistCategory>() { category, category1 }
//    };
//    WishlistItem wishlistItem2 = new WishlistItem()
//    {
//        Name = "Rękawiczka do smartfonów",
//        Categories = new List<WishlistCategory>() { categor2 }
//    };

//    NHibernate.ISession session = NHibernateHelper.GetCurrentSession();
//    try
//    {
//        using (ITransaction tx = session.BeginTransaction())
//        {
//            session.Save(wishlistItem);
//            session.Save(wishlistItem1);
//            session.Save(wishlistItem2);
//            tx.Commit();

//        }
//    }
//    catch (Exception ex)
//    {

//    }
//}