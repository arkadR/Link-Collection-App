using System.Linq;
using LinkCollectionApp.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

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

    [HttpGet]
    public string[][] GetConfiguration()
    {
      return _dbContext.Configuration.Select(c => new string[] { c.Key, c.Value }).ToArray();
    }

    [HttpPatch("{key}/{value}")]
    public IActionResult ChangeValue(string key, string value)
    {
      var configuration = _dbContext.Configuration.SingleOrDefault(c => c.Key == key);
      if (configuration == null)
        return NotFound();
      configuration.Value = value;
      _dbContext.SaveChanges();
      return Ok();
    }
  }
}
