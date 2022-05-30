﻿namespace LifeJournalCore.DTO
{
    public class GoalDetailsDTO
    {
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public long? Time { get; set; }
        public int? NumberOfEntries { get; set; }
        public int? RepetitionGoal { get; set; }

        public long? TimeReached { get; set; }
        public int? NumberOfEntriesDone { get; set; }
        public int? RepetitionGoalDone { get; set; }
    }
}
