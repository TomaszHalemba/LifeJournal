const PROXY_CONFIG = [
  {
    context: [
      "/weatherforecast",
      "/WishListService",
      "/GoalService",
      "/GoalEntryService",
      "/GoalDetailsService",
      "/CurrencyExchangeService",
      "/ReminderEntryGetService",
    ],
    target: "https://localhost:5001",
    secure: false
  }
]

module.exports = PROXY_CONFIG;
