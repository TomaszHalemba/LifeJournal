using FluentNHibernate.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LifeJournalCore.Model
{
    public class Wallet
    {


        public virtual int Id { get; set; }
        public virtual decimal Ammount { get; set; }
        public virtual Currency CurrencyOfWallet { get; set; }
        public virtual Account AccountOFWallet { get; set; }
    }

    public class WalletMap : ClassMap<Wallet>
    {

        public WalletMap()
        {
            Id(x => x.Id);
            Map(x => x.Ammount);
            References(x => x.CurrencyOfWallet).Unique();
            References(x => x.AccountOFWallet).Cascade.AllDeleteOrphan();

        }
    }
}
