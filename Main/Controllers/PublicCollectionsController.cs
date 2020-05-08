using System.Linq;
using System.Threading.Tasks;
using LinkCollectionApp.Data;
using LinkCollectionApp.Infrastructure.Implementations;
using LinkCollectionApp.Infrastructure.Interfaces;
using LinkCollectionApp.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Net.Http.Headers;
using UAParser;

namespace LinkCollectionApp.Controllers
{
  [Route("api/public")]
  [ApiController]
  public class PublicCollectionsController : Controller
  {
    private readonly ApplicationDbContext _dbContext;
    private readonly IRequestInfoService _requestInfoService;

    public PublicCollectionsController(ApplicationDbContext dbContext, IRequestInfoService requestInfoService)
    {
      _dbContext = dbContext;
      _requestInfoService = requestInfoService;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Collection>> GetPublicCollection(int id)
    {
      var requestInfo = await _requestInfoService.GetFromCurrentRequest();
      var visitEntry = new PublicCollectionVisit
      {
        BrowserName = requestInfo.ClientInfo.UA.Family,
        Country = requestInfo.OriginCountry,
        DeviceOS = requestInfo.ClientInfo.OS.Family
      };
      _dbContext.PublicCollectionVisit.Add(visitEntry);
      _dbContext.SaveChanges();
      
      var collection = _dbContext.Collection
        .Include(c => c.Elements)
        .SingleOrDefault(c => c.Id == id);
      if (collection == null || collection.IsPublic != true)
        return NotFound();
      return collection;
    }
  }
}
