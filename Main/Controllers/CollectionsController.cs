using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using LinkCollectionApp.Data;
using LinkCollectionApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace LinkCollectionApp.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class CollectionsController : ControllerBase
  {
    private readonly UserManager<ApplicationUser> _userManager;
    private readonly ApplicationDbContext _dbContext;

    public CollectionsController(UserManager<ApplicationUser> userManager, ApplicationDbContext dbContext)
    {
      _userManager = userManager;
      _dbContext = dbContext;
    }

    [HttpGet]
    public ICollection<Collection> GetUserCollections()
    {
      var user = CurrentUser;
      var collections = user.Collection;
      return collections;
      // return CurrentUser.Collection;
    }



    private ApplicationUser CurrentUser
    {
      get
      {
        var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return _dbContext.ApplicationUser
          .Include(user => user.Collection)
          .Single(u => u.Id == userId);
      }
    }
  }
}