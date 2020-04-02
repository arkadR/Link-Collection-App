using System.Collections.Generic;
using System.Linq;
using LinkCollectionApp.Data;
using LinkCollectionApp.Infrastructure.Interfaces;
using LinkCollectionApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LinkCollectionApp.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class CollectionsController : ControllerBase
  {
    private readonly ApplicationDbContext _dbContext;
    private readonly IUserContextProvider _userProvider;

    public CollectionsController(ApplicationDbContext dbContext, IUserContextProvider userProvider)
    {
      _dbContext = dbContext;
      _userProvider = userProvider;
    }

    [HttpGet]
    public ICollection<Collection> GetUserCollections()
    {
      var userId = _userProvider.GetCurrentUserId();
      var collections = _dbContext.Users
        .Include(u => u.Collection)
        .ThenInclude(c => c.Element)
        .Single(u => u.Id == userId)
        .Collection.ToList();

      return collections;
    }


  }
}
