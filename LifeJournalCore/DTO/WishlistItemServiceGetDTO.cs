using LifeJournalCore.Model;
using System.Linq;

namespace LifeJournalCore.DTO
{
    public class WishlistItemServiceGetDTO
    {
        //public WishlistItemServiceGetDTO() { }
        public static WishlistItemServiceGetDTO CreateWishlistItemServiceGetDTO(WishlistItem wishListItem)
        {
            WishlistItemServiceGetDTO wishlistItemServiceGetDTO = new WishlistItemServiceGetDTO();
            wishlistItemServiceGetDTO.Id = wishListItem.Id;
            wishlistItemServiceGetDTO.Name = wishListItem.Name;
            wishlistItemServiceGetDTO.Categories = String.Join(", ", wishListItem.Categories.Select(c => c.Name));
            wishlistItemServiceGetDTO.Description = wishListItem.Description;
            wishlistItemServiceGetDTO.Rank = wishListItem.Rank;
            wishlistItemServiceGetDTO.Deleted = wishListItem.Deleted;
            wishlistItemServiceGetDTO.Completed = wishListItem.Completed;
            return wishlistItemServiceGetDTO;
        }

        public virtual int Id { get; set; }
        public virtual string Name { get; set; }
        public virtual string Categories { get; set; }
        public virtual string Description { get; set; }
        public virtual int Rank { get; set; }
        public virtual bool Deleted { get; set; }
        public virtual bool Completed { get; set; }
    }
}
