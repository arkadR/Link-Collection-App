using System.Collections.Generic;
using System.Linq;
using LinkCollectionApp.Data;
using Microsoft.AspNetCore.Mvc;

namespace LinkCollectionApp.Controllers
{
  //[Authorize(Roles = "Administrator")]
  [Route("api/[controller]")]
  [ApiController]
  public class ConfigurationController : ControllerBase
  {
    private readonly ApplicationDbContext _dbContext;

    public ConfigurationController(ApplicationDbContext dbContext)
    {
      _dbContext = dbContext;
    }

    [HttpGet]
    public string[][] GetConfiguration()
    {
      //var configuration = _dbContext.Configuration.ToDictionary(c => c.Key, c => c.Value);
      var configuration = _dbContext.Configuration.Select(c => new string[] { c.Key, c.Value }).ToArray();
      return configuration;
    }
  }
}
