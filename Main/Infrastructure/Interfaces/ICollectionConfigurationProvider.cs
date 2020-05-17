
using LinkCollectionApp.Infrastructure.DTO;

namespace LinkCollectionApp.Infrastructure.Interfaces
{
  public interface ICollectionConfigurationProvider
  {
    int MaxCollectionsPerUser { get; set; }
    int MaxElementsInCollection { get; set; }
    CollectionConfiguration GetModel();
  }
}
