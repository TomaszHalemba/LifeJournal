using LifeJournalCore.Model;

namespace LifeJournalCore.DTO
{
    public class ReminderEntryGetDTO
    {
        public ReminderEntryGetDTO() { }
        public ReminderEntryGetDTO(ReminderEntry entry)
        {
            this.ReminderDate = entry.ReminderDate;
            this.IsDone = entry.IsDone;
            this.Id = entry.Id;
            this.Name = entry.Name;
            this.DateOfEntry = entry.DateOfEntry;
        }
        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual DateTime ReminderDate { get; set; }
        public virtual DateTime DateOfEntry { get; set; }
        public virtual bool IsDone { get; set; }
    }
}