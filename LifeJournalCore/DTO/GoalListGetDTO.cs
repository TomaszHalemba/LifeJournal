using LifeJournalCore.Model;

namespace LifeJournalCore.DTO
{
    public class GoalListGetDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public GoalListGetDTO() { }
        public  GoalListGetDTO (Goal x)
        {
            Id = x.Id;
            Name = x.Name;
        }
    }
}
