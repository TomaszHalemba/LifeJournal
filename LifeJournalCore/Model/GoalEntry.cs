using FluentNHibernate.Mapping;
using LifeJournalCore.DTO;

namespace LifeJournalCore.Model
{
    public class GoalEntry
    {
        public GoalEntry() { }
        public GoalEntry(GoalEntryPostDTO goalPostDTO)
        {
            Description = goalPostDTO.Description;
            DateForEntry = goalPostDTO.EntryDate;
            TimeOfEntry = TimeSpan.FromSeconds(goalPostDTO.Time);
            NumberOfRepetition = goalPostDTO.RepetitionGoal;
            Id = goalPostDTO.Id;
        }

        public virtual int Id { get; set; }
        public virtual string Description { get; set; }
        public virtual DateTime DateForEntry { get; set; }
        public virtual TimeSpan? TimeOfEntry { get; set; }
        public virtual double? NumberOfRepetition { get; set; }
        public virtual Goal GoalPlan { get; set; }
    }

    public class GoalEntryMap : ClassMap<GoalEntry>
    {

        public GoalEntryMap()
        {
            Id(x => x.Id).GeneratedBy.Sequence("SEQ_GoalEntry");
            Map(x => x.Description);
            Map(x => x.DateForEntry);
            Map(x => x.TimeOfEntry);
            Map(x => x.NumberOfRepetition);
            References(x => x.GoalPlan).Cascade.AllDeleteOrphan();
        }
    }
}
