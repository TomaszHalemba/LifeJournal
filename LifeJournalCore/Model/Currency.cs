using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LifeJournalCore.Model
{
    public class Currency
    {


        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string Sign { get; set; }
        public virtual ICollection<CurrencyExchange> Exchanges { get; set; }
        public virtual Wallet WalletForCurrency { get; set; }
    }

    public class CurrencyMap : ClassMap<Currency>
    {

        public CurrencyMap()
        {
            Id(x => x.Id);
            Map(x => x.Name);
            Map(x => x.Sign);
            HasMany(x => x.Exchanges).Inverse();
            HasOne(x => x.WalletForCurrency).Cascade.All();
        }
    }
}
