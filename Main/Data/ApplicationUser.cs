using System.Collections.Generic;
using LinkCollectionApp.Models;
using Microsoft.AspNetCore.Identity;

namespace LinkCollectionApp.Data
{
    // Add profile data for application users by adding properties to the ApplicationUser class
    public class ApplicationUser : IdentityUser
    {

      public virtual ICollection<Collection> Collection { get; set; }

      public virtual ICollection<Element> Element { get; set; }

      public virtual ICollection<SavedCollection> SavedCollection { get; set; }

      public virtual ICollection<SharedCollection> SharedCollection { get; set; }
    }
}
