using System.Linq;
using System.Security.Claims;
using LinkCollectionApp.Data;
using LinkCollectionApp.Infrastructure.Interfaces;
using LinkCollectionApp.Models;
using Microsoft.AspNetCore.Http;

namespace LinkCollectionApp.Infrastructure.Implementations
{
  public class UserContextProvider : IUserContextProvider
  {
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ApplicationDbContext _dbContext;

    public UserContextProvider(IHttpContextAccessor httpContextAccessor, ApplicationDbContext dbContext)
    {
      _httpContextAccessor = httpContextAccessor;
      _dbContext = dbContext;
    }

    public ApplicationUser GetCurrentUser()
    {
      var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
      return _dbContext.ApplicationUser.Single(u => u.Id == userId); ;
    }
  }
}
