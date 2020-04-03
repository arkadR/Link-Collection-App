using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace LinkCollectionApp.Models
{
  public class ApplicationUser : IdentityUser
  {

    public virtual ICollection<Collection> Collections { get; set; }

    public virtual ICollection<Element> CreatedElements { get; set; }

    public virtual ICollection<SavedCollection> SavedCollections { get; set; }

    public virtual ICollection<SharedCollection> SharedCollections { get; set; }
  }
}
