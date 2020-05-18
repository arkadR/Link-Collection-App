using LinkCollectionApp.Data;
using LinkCollectionApp.Infrastructure.DTO;
using LinkCollectionApp.Infrastructure.Interfaces;
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
    private readonly ICollectionConfigurationProvider _configurationProvider;

    public ConfigurationController(ApplicationDbContext dbContext, ICollectionConfigurationProvider configurationProvider)
    {
      _dbContext = dbContext;
      _configurationProvider = configurationProvider;
    }

    [HttpGet]
    public CollectionConfiguration GetConfiguration()
    {
      return _configurationProvider.GetModel();
    }

    [HttpPatch]
    public IActionResult UpdateConfiguration([FromBody] CollectionConfiguration newConfig)
    {
      _configurationProvider.MaxCollectionsPerUser = newConfig.MaxCollectionsPerUser;
      _configurationProvider.MaxElementsInCollection = newConfig.MaxElementsInCollection;
      return Ok();
    }
  }
}
