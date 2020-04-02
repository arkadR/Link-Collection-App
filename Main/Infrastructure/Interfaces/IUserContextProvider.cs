using LinkCollectionApp.Models;

namespace LinkCollectionApp.Infrastructure.Interfaces
{
  public interface IUserContextProvider
  {
    public ApplicationUser GetCurrentUser();
  }
}
