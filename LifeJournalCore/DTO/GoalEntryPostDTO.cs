using LifeJournalCore.Model;

namespace LifeJournalCore.DTO
{
    public class GoalEntryPostDTO
    {
        public GoalEntryPostDTO() { }
        public GoalEntryPostDTO(GoalEntry entry)
        {
            this.Description = entry.Description;
            this.Id = entry.Id;
            this.EntryDate = entry.DateForEntry;
            this.Time = (long)(entry.TimeOfEntry.HasValue ? entry.TimeOfEntry.Value.TotalSeconds : 0);
            this.RepetitionGoal = entry.NumberOfRepetition;
        }
        public virtual int GoalId { get; set; }
        public virtual int Id { get; set; }
        public virtual string Description { get; set; }
        public virtual DateTime EntryDate { get; set; }
        public virtual long Time { get; set; }
        public virtual double? RepetitionGoal { get; set; }
    }
}