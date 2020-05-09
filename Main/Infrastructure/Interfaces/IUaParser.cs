using UAParser;

namespace LinkCollectionApp.Infrastructure.Interfaces
{
  public interface IUaParser
  {
    public ClientInfo Parse(string uaString);
  }
}
