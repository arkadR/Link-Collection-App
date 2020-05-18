using System.Linq;
using System.Security.Claims;
using LinkCollectionApp.Data;
using LinkCollectionApp.Infrastructure.Interfaces;
using LinkCollectionApp.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;

namespace LinkCollectionApp.Infrastructure.Implementations
{
  public class UserContextProvider : IUserContextProvider
  {
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly ApplicationDbContext _dbContext;
    private readonly UserManager<ApplicationUser> _userManager;

    public UserContextProvider(
      IHttpContextAccessor httpContextAccessor, 
      ApplicationDbContext dbContext, 
      UserManager<ApplicationUser> userManager)
    {
      _httpContextAccessor = httpContextAccessor;
      _dbContext = dbContext;
      _userManager = userManager;
    }

    public ApplicationUser GetCurrentUser()
    {
      return _dbContext.ApplicationUser.Single(u => u.Id == GetCurrentUserId()); ;
    }


    public string GetCurrentUserId()
    {
      var userId = _httpContextAccessor.HttpContext?.User.FindFirstValue(ClaimTypes.NameIdentifier);
      return userId;
    }

    public bool IsCurrentUserInRole(string role)
    {
      var user = _userManager.FindByIdAsync(GetCurrentUserId()).Result;
      var roles = _userManager.GetRolesAsync(user).Result;
      return roles.Contains(role);
    }
  }
}
