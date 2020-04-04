using System.Linq;
using LinkCollectionApp.Data;
using LinkCollectionApp.Infrastructure.Interfaces;
using LinkCollectionApp.Models;
using LinkCollectionApp.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

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
  }
}
