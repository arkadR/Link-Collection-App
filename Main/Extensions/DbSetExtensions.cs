using System;
using System.Linq;
using Microsoft.EntityFrameworkCore;

namespace LinkCollectionApp.Extensions
{
  public static class DbSetExtensions
  {
    public static void RemoveAll<T>(this DbSet<T> dbSet, Func<T, bool> predicate) where T: class
    {
      var toRemove = dbSet.Where(predicate);
      dbSet.RemoveRange(toRemove);
    }
  }
}
