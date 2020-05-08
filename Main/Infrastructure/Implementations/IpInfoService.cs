using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using LinkCollectionApp.Infrastructure.Interfaces;

namespace LinkCollectionApp.Infrastructure.Implementations
{
  public class IpInfoService : IIpInfoService
  {
    public async Task<string> GetUserCountryByIp(IPAddress ip)
    {
      using var httpClient = new HttpClient();
      using var response = await httpClient.GetAsync($"https://ipinfo.io/{ip}");
      return await response.Content.ReadAsStringAsync();
    }
  }
}
