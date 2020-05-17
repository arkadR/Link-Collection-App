using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LinkCollectionApp.Data;
using LinkCollectionApp.Extensions;
using LinkCollectionApp.Infrastructure.Interfaces;
using LinkCollectionApp.Models;
using LinkCollectionApp.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
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
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly RoleManager<IdentityRole> _roleManager;

    public UsersController(
      IUserContextProvider userContextProvider, 
      ApplicationDbContext dbContext, 
      UserManager<ApplicationUser> userManager, 
      RoleManager<IdentityRole> roleManager)
    {
      _userContextProvider = userContextProvider;
      _dbContext = dbContext;
      _userManager = userManager;
      _roleManager = roleManager;
    }

    [HttpGet("me")]
    public async Task<UserDTO> GetCurrentUser()
    {
      var user = await _userManager.FindByIdAsync(_userContextProvider.GetCurrentUserId());
      var roles = await _userManager.GetRolesAsync(user);

      return UserDtoBuilder.FromApplicationUser(user).WithRoles(roles).Create();
    }


    [HttpGet]
    public List<UserDTO> GetUsers()
    {
      var users = _dbContext.ApplicationUser;
      return users.Select(user => UserDtoBuilder.FromApplicationUser(user).Create()).ToList();
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
      _userManager.DeleteAsync(user);
      _dbContext.SaveChanges();
      return Ok();
    }

    // Granting should be done differently but this is sufficient and quick
    [HttpGet("grantAdmin")]
    public async Task<bool> GrantAdminToCurrentUser()
    {
      var adminRoleExists = await _roleManager.RoleExistsAsync("Administrator");
      if (!adminRoleExists)
        await _roleManager.CreateAsync(new IdentityRole("Administrator"));

      var currentUser = await _userManager.FindByIdAsync(_userContextProvider.GetCurrentUserId());
      var result = await _userManager.AddToRoleAsync(currentUser, "Administrator");
      return result.Succeeded;
    }
  }
}
