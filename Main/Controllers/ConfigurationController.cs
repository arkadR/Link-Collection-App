using System.Linq;
using LinkCollectionApp.Data;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LinkCollectionApp.Controllers
{
  [Authorize(Roles = "Administrator")]
  [Route("api/[controller]")]
  [ApiController]
  public class ConfigurationController : ControllerBase
  {
    private readonly ApplicationDbContext _dbContext;

    public ConfigurationController(ApplicationDbContext dbContext)
    {
      _dbContext = dbContext;
    }

    [HttpGet("{key}")]
    public ActionResult<string> GetValue(string key)
    {
      var configuration = _dbContext.Configuration.SingleOrDefault(c => c.Key == key);
      if (configuration == null)
        return NotFound();
      return configuration.Value;
    }
  }
}
