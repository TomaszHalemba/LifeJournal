using LifeJournalCore.Model;
using System.Collections.Generic;

namespace LifeJournalCore.DTO
{
    public class GoalEntryGetDTO
    {
        public IEnumerable<GoalEntryPostDTO> Goals { get; set; }
        public IEnumerable<WeekDayStats> WeekDaysStats { get; set; }
        public IEnumerable<MonthStats> MonthsStats { get; set; }

        public class GenericStats
        {
            public long TimeSum { get; set; }
            public int Entries { get; set; }
            public double AvgTime => TimeSum / Entries;
            public long minTime { get; set; }
            public long maxTime { get; set; }
        }
        public class WeekDayStats : GenericStats
        { 
            public DayOfWeek DayOfWeek { get; set; }


        }
        public class MonthStats : GenericStats
        { 
            public int Month { get; set; }

        }
    }
}