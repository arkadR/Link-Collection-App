using System;
using LinkCollectionApp.Models;

namespace LinkCollectionApp.Extensions
{
  public static class ApplicationUserExtensions
  {
    public static bool IsLockedOut(this ApplicationUser user)
    {
      return user.LockoutEnabled && user.LockoutEnd > DateTimeOffset.Now;
    }
  }
}
