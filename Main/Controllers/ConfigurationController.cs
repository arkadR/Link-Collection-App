using LinkCollectionApp.Data;
using LinkCollectionApp.Infrastructure.DTO;
using LinkCollectionApp.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;

namespace LinkCollectionApp.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ConfigurationController : ControllerBase
  {
    private readonly ApplicationDbContext _dbContext;
    private readonly ICollectionConfigurationProvider _configurationProvider;
    private readonly IUserContextProvider _userProvider;

    public ConfigurationController(
      ApplicationDbContext dbContext, 
      ICollectionConfigurationProvider configurationProvider, 
      IUserContextProvider userProvider)
    {
      _dbContext = dbContext;
      _configurationProvider = configurationProvider;
      _userProvider = userProvider;
    }

    [HttpGet]
    public ActionResult<CollectionConfiguration> GetConfiguration()
    {
      //TODO: Consider extracting to a annotation or an action filter
      if (_userProvider.IsCurrentUserInRole("Administrator") == false)
        return Forbid();

      return _configurationProvider.GetModel();
    }

    [HttpPatch]
    public IActionResult UpdateConfiguration([FromBody] CollectionConfiguration newConfig)
    {
      if (_userProvider.IsCurrentUserInRole("Administrator") == false)
        return Forbid();

      _configurationProvider.MaxCollectionsPerUser = newConfig.MaxCollectionsPerUser;
      _configurationProvider.MaxElementsInCollection = newConfig.MaxElementsInCollection;
      return Ok();
    }
  }
}
