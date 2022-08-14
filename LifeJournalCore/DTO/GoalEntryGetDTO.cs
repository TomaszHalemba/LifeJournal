using LifeJournalCore.Model;
using System.Collections.Generic;

namespace LifeJournalCore.DTO
{
    public class GoalEntryGetDTO
    {
        public IEnumerable<GoalEntryPostDTO> Goals { get; set; }
        public IEnumerable<WeekDayStats> WeekDaysStats { get; set; }

        public class WeekDayStats
        { 
            public DayOfWeek DayOfWeek { get; set; }
            public long TimeSum { get; set; } 
            public int Entries { get; set; }
            public double AvgTime => TimeSum / Entries;

        }
    }
}