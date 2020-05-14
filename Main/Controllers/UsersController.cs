using System.Collections.Generic;
using System.Linq;
using LinkCollectionApp.Data;
using LinkCollectionApp.Extensions;
using LinkCollectionApp.Infrastructure.Interfaces;
using LinkCollectionApp.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

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
    public List<UserDTO> GetFriends()
    {
      var userId = _userContextProvider.GetCurrentUserId();
      var users = _dbContext.ApplicationUser.Where(user => user.Id != userId);
      return users.Select(user => UserDTO.FromApplicationUser(user)).ToList();
    }

    [Authorize(Roles = "Administrator")]
    [HttpDelete("{userId}")]
    public IActionResult DeleteUser(string userId)
    {
      var user = _dbContext.ApplicationUser
        .Include(u => u.Collections)
        .SingleOrDefault(u => u.Id == userId);

      if (user == null)
        return NotFound();

      user.Collections.ToList().ForEach(c =>
      {
        _dbContext.SavedCollection.RemoveAll(sc => sc.CollectionId == c.Id);
        _dbContext.SharedCollection.RemoveAll(sc => sc.CollectionId == c.Id);
        _dbContext.Element.RemoveAll(el => el.CollectionId == c.Id);
      });

      _dbContext.Collection.RemoveAll(c => c.OwnerId == user.Id);
      _dbContext.SaveChanges();
      return Ok();
    }
  }
}
