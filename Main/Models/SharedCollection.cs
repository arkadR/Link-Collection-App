
namespace LinkCollectionApp.Models
{
  public partial class SharedCollection
  {
    public int CollectionId { get; set; }
    public string UserId { get; set; }
    public bool? ViewRights { get; set; }
    public bool? EditRights { get; set; }

    public virtual Collection Collection { get; set; }
    public virtual ApplicationUser User { get; set; }
  }
}
