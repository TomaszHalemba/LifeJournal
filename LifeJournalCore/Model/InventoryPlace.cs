using FluentNHibernate.Mapping;
using LifeJournalCore.DTO;

namespace LifeJournalCore.Model
{
    public class InventoryPlace
    {
        public InventoryPlace() { }


        public virtual int Id { get; set; }
        public virtual string ItemName { get; set; }
        public virtual string Location { get; set; }
        public virtual string PreviousLocation { get; set; }


    }

    public class InventoryPlaceMap : ClassMap<InventoryPlace>
    {

        public InventoryPlaceMap()
        {
            Id(x => x.Id).GeneratedBy.Sequence("SEQ_InventoryPlace");
            Map(x => x.ItemName);
            Map(x => x.Location);
            Map(x => x.PreviousLocation);
        }
    }
}
