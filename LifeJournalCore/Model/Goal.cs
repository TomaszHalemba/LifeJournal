using FluentNHibernate.Mapping;
using LifeJournalCore.DTO;

namespace LifeJournalCore.Model
{
    public class Goal
    {
        public Goal() { }
        public Goal(GoalPostDTO goalPostDTO)
        {
            Name = goalPostDTO.Name;
            Description = goalPostDTO.Description;
            StartDate = goalPostDTO.StartDate;
            EndDate = goalPostDTO.EndDate;
            TimeSpanGoal = TimeSpan.FromSeconds(goalPostDTO.Time);
            RepetitionGoal = goalPostDTO.RepetitionGoal;
            Entries = new List<GoalEntry>();

        }

        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string Description { get; set; }
        public virtual DateTime StartDate { get; set; }
        public virtual DateTime? EndDate { get; set; }
        public virtual bool IsCompleted { get; set; }

        public virtual TimeSpan? TimeSpanGoal { get; set; }
        public virtual int? RepetitionGoal{ get; set; }
        public virtual ICollection<GoalEntry> Entries { get; set; }

    }

    public class GoalMap : ClassMap<Goal>
    {

        public GoalMap()
        {
            Id(x => x.Id);
            Map(x => x.Name);
            Map(x => x.Description);
            Map(x => x.StartDate);
            Map(x => x.EndDate);
            Map(x => x.IsCompleted);
            Map(x => x.TimeSpanGoal);
            Map(x => x.RepetitionGoal);
            HasMany(x => x.Entries).Inverse();
        }
    }
}
