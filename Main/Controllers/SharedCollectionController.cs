using System.Collections.Generic;
using System.Linq;
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
    public IActionResult ShareCollection(SharedCollectionCreationData data)
    {
      var userId = _userProvider.GetCurrentUserId();
      var collectionToShare = _dbContext.Collection.SingleOrDefault(c => c.Id == data.CollectionId);
      if (collectionToShare == null)
        return NotFound();

      if (collectionToShare.OwnerId != userId)
        return Forbid();

      var userToShare = _dbContext.Users
        .Include(user => user.SharedCollections)
        .SingleOrDefault(user => user.Id == data.UserId);

      if (userToShare == null)
        return NotFound();

      if (userToShare.SharedCollections.Any(sc => sc.CollectionId == data.CollectionId))
        return NoContent();

      userToShare.SharedCollections.Add(new SharedCollection
      {
        CollectionId = data.CollectionId,
        UserId = data.UserId,
        EditRights = data.EditRights
      });
      _dbContext.SaveChanges();
      return Ok();
    }

    [HttpPatch("{collectionId}")]
    public IActionResult ChangeUserRoghts(int collectionId, [FromBody] SharedCollectionCreationData data)
    {
      var userId = _userProvider.GetCurrentUserId();
      var sharedCollection = _dbContext.SharedCollection
        .Include(sc => sc.Collection)
        .SingleOrDefault(sc => sc.UserId == data.UserId && sc.CollectionId == data.CollectionId);
      if (sharedCollection == null)
        return NotFound();

      if (sharedCollection.Collection.OwnerId != userId)
        return Forbid();

      sharedCollection.EditRights = data.EditRights;
      _dbContext.SaveChanges();
      return Ok();
    }

    [HttpDelete("{collectionId}/{userId}")]
    public IActionResult DeleteCollection(int collectionId, string userId)
    {
      var currentUserId = _userProvider.GetCurrentUserId();
      var sharedCollection = _dbContext.SharedCollection
        .Include(sc => sc.Collection)
        .SingleOrDefault(sc => sc.UserId == userId && sc.CollectionId == collectionId);
      if (sharedCollection == null)
        return NotFound();

      if (sharedCollection.Collection.OwnerId != currentUserId)
        return Forbid();

      _dbContext.SharedCollection.Remove(sharedCollection);

      _dbContext.SaveChanges();
      return Ok();
    }

    [HttpGet("contributors")]
    public ActionResult<List<CollectionContributorDTO>> GetContributorsSharedCollections()
    {
      var userId = _userProvider.GetCurrentUserId();
      var userCollections = _dbContext.Users
        .Include(u => u.Collections)
        .ThenInclude(c => c.SharedCollections)
        .ThenInclude(sc => sc.User)
        .Single(u => u.Id == userId)
        .Collections.ToList();

      var sharedCollections = userCollections.SelectMany(c => c.SharedCollections).ToList();
      return sharedCollections.Select(CollectionContributorDTO.FromSharedCollection).ToList();
    }
  }
}
