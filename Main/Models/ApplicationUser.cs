using System.Collections.Generic;
using Microsoft.AspNetCore.Identity;

namespace LinkCollectionApp.Models
{
  public class ApplicationUser : IdentityUser
  {

    public virtual ICollection<Collection> Collection { get; set; }

    public virtual ICollection<Element> Element { get; set; }

    public virtual ICollection<SavedCollection> SavedCollection { get; set; }

    public virtual ICollection<SharedCollection> SharedCollection { get; set; }
  }
}
