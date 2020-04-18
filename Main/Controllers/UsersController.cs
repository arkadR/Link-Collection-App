using System.Collections.Generic;
using System.Linq;
using LinkCollectionApp.Data;
using LinkCollectionApp.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LinkCollectionApp.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private readonly ApplicationDbContext _dbContext;
    private readonly IUserContextProvider _userContextProvider;

    public UsersController(IUserContextProvider userContextProvider, ApplicationDbContext dbContext)
    {
      _userContextProvider = userContextProvider;
      _dbContext = dbContext;
    }

    [HttpGet]
    public List<object> GetFriends()
    {
      var userId = _userContextProvider.GetCurrentUserId();
      var users = _dbContext.ApplicationUser.Where(user => user.Id != userId);
      return users.Select(user => new
      {
        Id = user.Id,
        Name = user.UserName,
        Email = user.Email
      } as object).ToList();
    }
  }
}
