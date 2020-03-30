
using Newtonsoft.Json;

namespace LinkCollectionApp.Models
{
  public partial class Element
  {
    public int Id { get; set; }
    public int CollectionId { get; set; }
    public string OwnerId { get; set; }
    public string Link { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public int? Sequence { get; set; }

    [JsonIgnore]
    public virtual Collection Collection { get; set; }
    [JsonIgnore]
    public virtual ApplicationUser Owner { get; set; }
  }
}
