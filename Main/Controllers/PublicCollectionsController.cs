using System.Linq;
using LinkCollectionApp.Data;
using LinkCollectionApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LinkCollectionApp.Controllers
{
  [Route("api/public")]
  [ApiController]
  public class PublicCollectionsController : Controller
  {
    private readonly ApplicationDbContext _dbContext;

    public PublicCollectionsController(ApplicationDbContext dbContext)
    {
      _dbContext = dbContext;
    }

    [HttpGet("{id}")]
    public ActionResult<Collection> GetPublicCollection(int id)
    {
      var collection = _dbContext.Collection
        .Include(c => c.Elements)
        .SingleOrDefault(c => c.Id == id);
      if (collection == null || collection.IsPublic != true)
        return NotFound();
      return collection;
    }
  }
}
