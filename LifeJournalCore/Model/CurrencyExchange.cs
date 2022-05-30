
using FluentNHibernate.Mapping;
using LifeJournalCore.DTO;

namespace LifeJournalCore.Model
{
    public class CurrencyExchange
    {
        public CurrencyExchange() { }
        public CurrencyExchange(CurrencyExchangeAddDTO currencyExchangeAddDTO)
        {
            this.FeeRecived = (decimal?)currencyExchangeAddDTO.feeCurrencyRecived;
            this.FeeRecivedType = currencyExchangeAddDTO.feeRecivedRadio;
            this.FeeSent = (decimal?)currencyExchangeAddDTO.feeCurrencySent;
            this.FeeSentType = currencyExchangeAddDTO.feeSentRadio;

            this.AmmountRecived = (decimal)currencyExchangeAddDTO.CurrencyRecived;
            this.AmmountSent = (decimal)currencyExchangeAddDTO.CurrencySent;

            this.Rate = (decimal?)currencyExchangeAddDTO.Rate;
            this.EntryDate = currencyExchangeAddDTO.EntryDate;
            this.FinalValue = (decimal?)currencyExchangeAddDTO.FinalValue;


        }

        public virtual int Id { get; set; }
        public virtual DateTime EntryDate { get; set; }
        public virtual Account AccountSent { get; set; }
        public virtual Account AccountDestination { get; set; }
        public virtual decimal AmmountSent { get; set; }
        public virtual Currency CurrencySent { get; set; }
        public virtual decimal AmmountRecived { get; set; }
        public virtual Currency CurrencyRecived { get; set; }
        public virtual decimal? FeeRecived { get; set; }
        public virtual decimal? FinalValue { get; set; }
        public virtual decimal? FeeSent { get; set; }
        public virtual decimal? Rate { get; set; }
        public virtual int FeeSentType { get; set; }
        public virtual int FeeRecivedType { get; set; }
    }

    public class TransactionMap : ClassMap<CurrencyExchange>
    {
        private string AccountSentKey = "AccountSentID";
        private string AccountDestinationKey = "AccountDestID";        
        private string CurrencySentKey = "CurrencySentID";
        private string CurrencyDestinationKey = "CurrencyDestID";

        public TransactionMap()
        {
            Id(x => x.Id);
            References(x => x.AccountSent).Column(AccountSentKey).Cascade.AllDeleteOrphan();
            References(x => x.AccountDestination).Column(AccountDestinationKey).Cascade.AllDeleteOrphan();
            References(x => x.CurrencySent).Column(CurrencySentKey).Cascade.AllDeleteOrphan();
            References(x => x.CurrencyRecived).Column(CurrencyDestinationKey).Cascade.AllDeleteOrphan();
            Map(x => x.AmmountSent);
            Map(x => x.AmmountRecived);
            Map(x => x.Rate);
            Map(x => x.FeeRecived);
            Map(x => x.FeeRecivedType);
            Map(x => x.FeeSent);
            Map(x => x.FeeSentType);


        }
    }
}
