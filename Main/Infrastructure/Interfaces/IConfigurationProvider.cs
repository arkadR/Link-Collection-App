
namespace LinkCollectionApp.Infrastructure.Interfaces
{
  public interface IConfigurationProvider
  {
    T Get<T>(string key, T defaultValue);
    void Set<T>(string key, T value);
  }
}
