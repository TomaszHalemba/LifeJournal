using FluentNHibernate.Mapping;
using LifeJournalCore.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LifeJournalCore.Model
{
    public class WishlistCategory
    {
        public WishlistCategory()
        {
        }
        public WishlistCategory(string name)
        {
            this.Name = name;
        }

        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual bool Deleted { get; set; }
        public virtual IList<WishlistItem> Items { get; set; }
    }
    public class WishlistCategoryMap : ClassMap<WishlistCategory>
    {
        private string WishlistItemKey = "wishlistItemId";
        private string WishlistCategoryKey = "wishlistCategoryId";
        private string WishlistItemCategoryTable = "WishlistItemCategory";
        public WishlistCategoryMap()
        {
            Id(x => x.Id);
            Map(x => x.Name);
            Map(x => x.Deleted);
            HasManyToMany(x => x.Items).Table(WishlistItemCategoryTable).Inverse();//.Not.LazyLoad()
                    //.ParentKeyColumn(WishlistCategoryKey)
                    //.ChildKeyColumn(WishlistItemKey);

        }
    }
}
