using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using LinkCollectionApp.Data;
using LinkCollectionApp.Infrastructure.Interfaces;
using LinkCollectionApp.Models;
using LinkCollectionApp.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LinkCollectionApp.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class SharedCollectionsController : ControllerBase
  {
    private readonly ApplicationDbContext _dbContext;
    private readonly IUserContextProvider _userProvider;

    public SharedCollectionsController(ApplicationDbContext dbContext, IUserContextProvider userProvider)
    {
      _dbContext = dbContext;
      _userProvider = userProvider;
    }

    [HttpGet]
    public ICollection<SharedCollection> GetUserSharedCollections()
    {
      var userId = _userProvider.GetCurrentUserId();
      var sharedCollections = _dbContext.Users
        .Include(u => u.SharedCollections)
        .ThenInclude(sc => sc.Collection)
        .ThenInclude(c => c.Elements)
        .Single(u => u.Id == userId)
        .SharedCollections.ToList();

      return sharedCollections;
    }

    [HttpPost]
    public void ShareCollection(SharedCollectionCreationData data)
    {
      var userId = _userProvider.GetCurrentUserId();
      _dbContext.Users
        .Include(user => user.SharedCollections)
        .Single(user => user.Id == data.UserId).SharedCollections
        .Add(new SharedCollection
      {
        CollectionId = data.CollectionId,
        UserId = data.UserId,
        ViewRights = data.ViewRights,
        EditRights = data.EditRights
      });
      _dbContext.SaveChanges();
    }
  }
}
