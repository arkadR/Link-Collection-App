using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LinkCollectionApp.Models.DTO
{
  public class SharedCollectionCreationData
  {
    public int CollectionId { get; set; }
    public string UserId { get; set; }
    public bool ViewRights { get; set; }
    public bool EditRights { get; set; }
  }
}
