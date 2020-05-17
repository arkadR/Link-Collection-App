using System.Linq;
using LinkCollectionApp.Data;
using LinkCollectionApp.Infrastructure.Interfaces;
using LinkCollectionApp.Models;
using Newtonsoft.Json;

namespace LinkCollectionApp.Infrastructure.Implementations
{
  public class ConfigurationProvider : IConfigurationProvider
  {
    private readonly ApplicationDbContext _dbContext;

    public ConfigurationProvider(ApplicationDbContext dbContext)
    {
      _dbContext = dbContext;
    }

    public T Get<T>(string key, T defaultValue)
    {
      var entry = _dbContext.Configuration.SingleOrDefault(c => c.Key == key);
      if (entry != null)
        return JsonConvert.DeserializeObject<T>(entry.Value);

      var newEntry = new ConfigurationEntry {Key = key, Value = JsonConvert.SerializeObject(defaultValue)};
      _dbContext.Configuration.Add(newEntry);
      _dbContext.SaveChanges();
      return defaultValue;

    }

    public void Set<T>(string key, T value)
    {
      var entry = _dbContext.Configuration.SingleOrDefault(c => c.Key == key);
      if (entry != null)
      {
        entry.Value = JsonConvert.SerializeObject(value);
      }
      else
      {
        entry = new ConfigurationEntry { Key = key, Value = JsonConvert.SerializeObject(value) };
        _dbContext.Configuration.Add(entry);
      }
      _dbContext.SaveChanges();
    }
  }
}
