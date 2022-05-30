namespace LifeJournalCore.DTO
{
    public class GoalPostDTO
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public long Time { get; set; }
        public int? NumberOfEntries { get; set; }
        public int? RepetitionGoal { get; set; }
    }
}
