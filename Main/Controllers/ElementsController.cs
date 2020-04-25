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

    [HttpDelete("{id}")]
    public IActionResult DeleteElement(int id)
    {
      var userId = _userProvider.GetCurrentUserId();
      var element = _dbContext.Element.SingleOrDefault(el => el.Id == id);

      if (element == null)
        return NotFound();

      var parentCollection = _dbContext.Collection.Single(c => c.Id == element.CollectionId);
      var usersWithEditPermission = _dbContext.SharedCollection
        .Where(sc => sc.CollectionId == element.CollectionId)
        .Where(sc => sc.EditRights == true)
        .Select(sc => sc.UserId)
        .ToList();

      if (parentCollection.OwnerId != userId && usersWithEditPermission.Contains(userId) == false)
        return Forbid();

      var succeedingElements = _dbContext.Collection
        .Include(c => c.Elements)
        .Single(c => c.Id == element.CollectionId)
        .Elements.Where(el => el.Sequence > element.Sequence)
        .ToList();

      succeedingElements.ForEach(el => el.Sequence--);
      _dbContext.Element.Remove(element);
      _dbContext.SaveChanges();
      return Ok();
    }

    [HttpPatch("{id}")]
    public IActionResult UpdateElement(int id, ElementUpdateData updateData)
    {
      var userId = _userProvider.GetCurrentUserId();
      var element = _dbContext.Element.SingleOrDefault(el => el.Id == id);

      if (element == null)
        return NotFound();

      var parentCollection = _dbContext.Collection.Single(c => c.Id == element.CollectionId);
      var usersWithEditPermission = _dbContext.SharedCollection
        .Where(sc => sc.CollectionId == element.CollectionId)
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
