
using FluentNHibernate.Mapping;
using LifeJournalCore.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LifeJournalCore.Model
{
    public class WishlistItem
    {
        public WishlistItem() { }
        public WishlistItem(WishlistItemServiceGetDTO wishlistItem)
        {
            this.Completed = wishlistItem.Completed;
            this.Rank = wishlistItem.Rank;
            this.Name = wishlistItem.Name;
            this.Description = wishlistItem.Description;
            this.Categories = wishlistItem.Categories != null ? wishlistItem.Categories.Split(',').Select(x => new WishlistCategory(x)).ToList() : new List<WishlistCategory>();
        }

        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual IList<WishlistCategory> Categories { get; set; }
        public virtual string Description { get; set; }
        public virtual int Rank { get; set; }
        public virtual bool Deleted { get; set; }
        public virtual bool Completed { get; set; }
    }
    public class WishlistItemMap : ClassMap<WishlistItem>
    {
        private string WishlistItemKey = "wishlistItemId";
        private string WishlistCategoryKey = "wishlistCategoryId";
        private string WishlistItemCategoryTable = "WishlistItemCategory";
        public WishlistItemMap()
        {
            Id(x => x.Id);
            Map(x => x.Name);
            Map(x => x.Description);
            Map(x => x.Rank);
            Map(x => x.Deleted);
            Map(x => x.Completed);

            HasManyToMany(x => x.Categories).Table(WishlistItemCategoryTable).Cascade.All();
            //.ParentKeyColumn(WishlistItemKey)
            //.ChildKeyColumn(WishlistCategoryKey);

        }
    }
}
