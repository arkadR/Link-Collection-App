using System.Net;
using System.Threading.Tasks;

namespace LinkCollectionApp.Infrastructure.Interfaces
{
  public interface IIpInfoService
  {
    public Task<string> GetUserCountryByIp(IPAddress ip);
  }
}
