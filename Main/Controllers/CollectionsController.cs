using System.Collections.Generic;
using System.Linq;
using System.Text.Json.Serialization;
using IdentityServer4.Extensions;
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
        .Include(u => u.Collections)
        .ThenInclude(c => c.Elements)
        .Single(u => u.Id == userId)
        .Collections.ToList();

      return collections;
    }

    [HttpPost]
    public IActionResult AddCollection([FromBody] CollectionCreationData data)
    {
      var userId = _userProvider.GetCurrentUserId();
      var collection = new Collection {Name = data.Name, IsPublic = data.IsPublic, OwnerId = userId, Description = data.Description};
      _dbContext.Add(collection);
      _dbContext.SaveChanges();
      return Ok();
    }

    [HttpDelete("{id}")]
    public IActionResult DeleteCollection(int id)
    {
      var userId = _userProvider.GetCurrentUserId();
      var collection = _dbContext.Collection.SingleOrDefault(c => c.Id == id);
      if (collection == null)
        return NotFound();
      if (collection.OwnerId != userId)
        return Forbid();
      
      using var dbContextTransaction = _dbContext.Database.BeginTransaction();

      //delete connected saved collections
      var savedCollections = _dbContext.SavedCollection.Where(sc => sc.CollectionId == id).ToArray();
      _dbContext.RemoveRange(savedCollections);

      //delete connected shared collections
      var sharedCollections = _dbContext.SharedCollection.Where(sc => sc.CollectionId == id).ToArray();
      _dbContext.RemoveRange(sharedCollections);

      //delete collection's elements
      var elements = _dbContext.Element.Where(sc => sc.CollectionId == id).ToArray();
      _dbContext.RemoveRange(elements);

      //delete collection
      _dbContext.Remove(collection);

      _dbContext.SaveChanges();
      dbContextTransaction.Commit();
      return Ok();
    }

    [HttpPatch("{id}")]
    public IActionResult UpdateCollection(int id, [FromBody] CollectionUpdateData data)
    {
      var userId = _userProvider.GetCurrentUserId();
      var collection = _dbContext.Collection.SingleOrDefault(c => c.Id == id);
      if (collection == null)
        return NotFound();

      var sharedCollection = _dbContext.SharedCollection.SingleOrDefault(sc => sc.CollectionId == id && sc.UserId == userId);
      bool canEditSharedCollection = sharedCollection?.EditRights == true;

      if(collection.OwnerId != userId && !canEditSharedCollection)
        return Forbid();
      
      if (data.Name.IsNullOrEmpty() == false)
        collection.Name = data.Name;
      if (data.Description.IsNullOrEmpty() == false)
        collection.Description = data.Description;
      _dbContext.Update(collection);
      _dbContext.SaveChanges();
      return Ok();
    }
  }
}
