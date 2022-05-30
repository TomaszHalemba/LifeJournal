using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LifeJournalCore.Model
{
    public class Account
    {


        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string Url { get; set; }
        public virtual ICollection<CurrencyExchange> Exchanges { get; set; }
        public virtual ICollection<Wallet> Wallets { get; set; }

    }

    public class AccountMap : ClassMap<Account>
    {

        public AccountMap()
        {
            Id(x => x.Id);
            Map(x => x.Name);
            Map(x => x.Url);
            HasMany(x => x.Exchanges).Inverse();
            HasMany(x => x.Wallets).Inverse();
        }
    }
}
