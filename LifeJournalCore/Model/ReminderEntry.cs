using FluentNHibernate.Mapping;
using LifeJournalCore.DTO;

namespace LifeJournalCore.Model
{
    public class ReminderEntry
    {
        public ReminderEntry() { }

        public ReminderEntry(ReminderEntryGetDTO goalPostDTO)
        {
            this.DateOfEntry = DateTime.Now;
            this.ReminderDate = goalPostDTO.ReminderDate;
            this.Name = goalPostDTO.Name;
        }

        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual DateTime ReminderDate { get; set; }
        public virtual DateTime DateOfEntry { get; set; }
        public virtual bool IsDone { get; set; }
    }

    public class ReminderEntryMap : ClassMap<ReminderEntry>
    {

        public ReminderEntryMap()
        {
            Id(x => x.Id).GeneratedBy.Sequence("SEQ_ReminderEntry");
            Map(x => x.Name);
            Map(x => x.ReminderDate);
            Map(x => x.DateOfEntry);
            Map(x => x.IsDone);
        }
    }
}
