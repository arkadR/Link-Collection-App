using System;
using System.Collections.Generic;
using LinkCollectionApp.Data;

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

    public virtual Collection Collection { get; set; }
    public virtual ApplicationUser Owner { get; set; }
  }
}
