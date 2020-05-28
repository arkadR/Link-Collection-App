using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using LinkCollectionApp.Data;
using LinkCollectionApp.Infrastructure.Interfaces;
using LinkCollectionApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;

namespace LinkCollectionApp.Controllers
{
  [Route("api/public")]
  [ApiController]
  public class PublicCollectionsController : Controller
  {
    private readonly ApplicationDbContext _dbContext;
    private readonly IUserContextProvider _userContextProvider;
    private readonly IRequestInfoService _requestInfoService;
    private readonly IMemoryCache _cache;

    public PublicCollectionsController(
      ApplicationDbContext dbContext, 
      IRequestInfoService requestInfoService, 
      IUserContextProvider userContextProvider, 
      IMemoryCache cache)
    {
      _dbContext = dbContext;
      _requestInfoService = requestInfoService;
      _userContextProvider = userContextProvider;
      _cache = cache;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Collection>> GetPublicCollection(int id)
    {
      var collection = _dbContext.Collection
        .Include(c => c.Elements)
        .SingleOrDefault(c => c.Id == id);
      if (collection == null || collection.IsPublic != true)
        return NotFound();

      await SaveVisitorData(id);

      return collection;
    }

    [HttpGet("{id}/stats")]
    [Authorize]
    public ActionResult<ICollection<PublicCollectionVisit>> GetCollectionVisitorData(int id)
    {
      var userId = _userContextProvider.GetCurrentUserId();
      var collection = _dbContext.Collection.SingleOrDefault(c => c.Id == id);

      if (collection == null)
        return NotFound();

      if (collection.IsPublic == false)
        return BadRequest();

      if (userId != collection.OwnerId)
        return Forbid();

      var data = _cache.GetOrCreate(id, entry =>
      {
        entry.AbsoluteExpiration = DateTimeOffset.Now.AddDays(1);
        return _dbContext.PublicCollectionVisit.Where(c => c.CollectionId == id).ToList();
      });

      return data;
    }




    private async Task SaveVisitorData(int collectionId)
    {
      var requestInfo = await _requestInfoService.GetFromCurrentRequest();
      if (requestInfo?.IpInfo.Bogon == false)
      {
        var visitEntry = new PublicCollectionVisit
        {
          CollectionId = collectionId,
          BrowserName = requestInfo.ClientInfo.UA.Family,
          Country = requestInfo.IpInfo.Country,
          DeviceOS = requestInfo.ClientInfo.OS.Family
        };
        _dbContext.PublicCollectionVisit.Add(visitEntry);
        _dbContext.SaveChanges();
      }
    }
  }
}
