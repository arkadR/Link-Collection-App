using System;
using System.Collections.Generic;
using Newtonsoft.Json;

namespace LinkCollectionApp.Models
{
  public partial class Collection
  {
    public Collection()
    {
      Element = new HashSet<Element>();
      SavedCollection = new HashSet<SavedCollection>();
      SharedCollection = new HashSet<SharedCollection>();
    }

    public int Id { get; set; }
    public bool? IsPublic { get; set; }
    public string OwnerId { get; set; }
    public string Name { get; set; }
    public string Description { get; set; }
    public DateTime CreatedDate { get; set; }

    [JsonIgnore]
    public virtual ApplicationUser Owner { get; set; }
    public virtual ICollection<Element> Element { get; set; }
    [JsonIgnore]
    public virtual ICollection<SavedCollection> SavedCollection { get; set; }
    [JsonIgnore]
    public virtual ICollection<SharedCollection> SharedCollection { get; set; }
  }
}
