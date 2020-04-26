using System.Linq;
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
  public class ElementsController : ControllerBase
  {

    private readonly ApplicationDbContext _dbContext;
    private readonly IUserContextProvider _userProvider;

    public ElementsController(ApplicationDbContext dbContext, IUserContextProvider userProvider)
    {
      _dbContext = dbContext;
      _userProvider = userProvider;
    }

    [HttpPost]
    public IActionResult AddElement([FromBody] ElementCreationData elementData)
    {
      var userId = _userProvider.GetCurrentUserId();
      var lastSequenceInCollection = _dbContext.Collection
        .Find(elementData.CollectionId).Elements
        .Max(e => e.Sequence);

      var element = new Element
      {
        Link = elementData.Link, 
        Name = elementData.Name, 
        CollectionId = elementData.CollectionId,
        OwnerId = userId,
        Sequence = lastSequenceInCollection + 1 ?? 1
      };
      _dbContext.Add(element);
      _dbContext.SaveChanges();
      return Ok();
    }

    [HttpDelete("{collectionId}/{elementId}")]
    public IActionResult DeleteElement(int collectionId, int elementId)
    {
      var userId = _userProvider.GetCurrentUserId();
      var parentCollection = _dbContext.Collection
        .Include(c => c.Elements)
        .SingleOrDefault(c => c.Id == collectionId);
      var element = parentCollection?.Elements.SingleOrDefault(el => el.Id == elementId);
      if (element == null)
        return NotFound();

      var usersWithEditPermission = _dbContext.SharedCollection
        .Where(sc => sc.CollectionId == collectionId)
        .Where(sc => sc.EditRights == true)
        .Select(sc => sc.UserId)
        .ToList();

      if (parentCollection.OwnerId != userId && usersWithEditPermission.Contains(userId) == false)
        return Forbid();

      var succeedingElements = _dbContext.Collection
        .Include(c => c.Elements)
        .Single(c => c.Id == collectionId)
        .Elements.Where(el => el.Sequence > element.Sequence)
        .ToList();

      succeedingElements.ForEach(el => el.Sequence--);
      _dbContext.Element.Remove(element);
      _dbContext.SaveChanges();
      return Ok();
    }

    [HttpPatch("{collectionId}/{elementId}")]
    public IActionResult UpdateElement(int collectionId, int elementId, ElementUpdateData updateData)
    {
      var userId = _userProvider.GetCurrentUserId();
      var parentCollection = _dbContext.Collection
        .Include(col => col.Elements)
        .SingleOrDefault(c => c.Id == collectionId);
      var element = parentCollection?.Elements.SingleOrDefault(el => el.Id == elementId);
      if (element == null)
        return NotFound();

      var usersWithEditPermission = _dbContext.SharedCollection
        .Where(sc => sc.CollectionId == collectionId)
        .Where(sc => sc.EditRights == true)
        .Select(sc => sc.UserId)
        .ToList();

      if (parentCollection.OwnerId != userId && usersWithEditPermission.Contains(userId) == false)
        return Forbid();

      if (updateData.Name.IsNullOrEmpty() == false)
        element.Name = updateData.Name;
      if (updateData.Link.IsNullOrEmpty() == false)
        element.Link = updateData.Link;
      _dbContext.SaveChanges();
      return Ok();
    }
  }
}
