using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace LinkCollectionApp.Models
{
  public partial class Collection
  {
    public Collection()
    {
      Elements = new HashSet<Element>();
      SavedCollections = new HashSet<SavedCollection>();
      SharedCollections = new HashSet<SharedCollection>();
    }

    public int Id { get; set; }
    public bool? IsPublic { get; set; }
    public string OwnerId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime CreatedDate { get; set; }

    [JsonIgnore]
    public virtual ApplicationUser Owner { get; set; }
    public virtual ICollection<Element> Elements { get; set; }
    [JsonIgnore]
    public virtual ICollection<SavedCollection> SavedCollections { get; set; }
    [JsonIgnore]
    public virtual ICollection<SharedCollection> SharedCollections { get; set; }
  }
}
