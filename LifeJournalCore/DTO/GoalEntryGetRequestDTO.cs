using FluentNHibernate.Conventions;

namespace LifeJournalCore.DTO
{
    public class GoalEntryGetRequestDTO
    {
        public virtual int GoalId { get; set; }
         public virtual string? StartDate { get; set; }
        public virtual string? EndDate { get; set; }
        public virtual DateTime StartDateDate => string.IsNullOrEmpty(StartDate) ? DateTime.MinValue : DateTime.Parse(StartDate);
        public virtual DateTime EndDateDate => string.IsNullOrEmpty(EndDate) ? DateTime.MaxValue : DateTime.Parse(EndDate);
    }
}