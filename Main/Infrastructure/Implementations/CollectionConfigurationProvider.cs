using LinkCollectionApp.Infrastructure.DTO;
using LinkCollectionApp.Infrastructure.Interfaces;

namespace LinkCollectionApp.Infrastructure.Implementations
{
  public class CollectionConfigurationProvider : ICollectionConfigurationProvider
  {
    private readonly IConfigurationProvider _configurationProvider;

    public CollectionConfigurationProvider(IConfigurationProvider configurationProvider)
    {
      this._configurationProvider = configurationProvider;
    }

    public int MaxCollectionsPerUser
    {
      get => _configurationProvider.Get(nameof(MaxCollectionsPerUser), 100);
      set => _configurationProvider.Set(nameof(MaxCollectionsPerUser), value);
    }

    public int MaxElementsInCollection
    {
      get => _configurationProvider.Get(nameof(MaxElementsInCollection), 100);
      set => _configurationProvider.Set(nameof(MaxElementsInCollection), value);
    }
    public CollectionConfiguration GetModel()
    {
      return new CollectionConfiguration
      {
        MaxCollectionsPerUser = MaxCollectionsPerUser, 
        MaxElementsInCollection = MaxElementsInCollection
      };
    }
  }
}
