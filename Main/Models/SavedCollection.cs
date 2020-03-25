
namespace LinkCollectionApp.Models
{
  public partial class SavedCollection
  {
    public string UserId { get; set; }
    public int CollectionId { get; set; }

    public virtual Collection Collection { get; set; }
    public virtual ApplicationUser User { get; set; }
  }
}
