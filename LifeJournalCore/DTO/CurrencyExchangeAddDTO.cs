namespace LifeJournalCore.DTO
{
    public class CurrencyExchangeAddDTO
    {
        public int AccountSentId { get; set; }
        public int AccountRecivedId { get; set; }
        public double CurrencySent { get; set; }
        public int CurrencySentId { get; set; }
        public double CurrencyRecived { get; set; }
        public int CurrencyRecivedId { get; set; }
        public double? feeCurrencyRecived { get; set; }
        public double? feeCurrencySent { get; set; }
        public double? Rate { get; set; }
        public double? FinalValue { get; set; }
        public int feeSentRadio { get; set; }
        public int feeRecivedRadio { get; set; }
        public virtual DateTime EntryDate { get; set; }

        public bool IgnoreRecivedAccount { get; set; }
        public bool ignoreSentAccount { get; set; }

        public DateTime entryDate { get; set; }
    }

}