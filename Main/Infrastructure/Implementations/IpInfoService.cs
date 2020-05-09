using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using LinkCollectionApp.Infrastructure.DTO;
using LinkCollectionApp.Infrastructure.Interfaces;
using Newtonsoft.Json;

namespace LinkCollectionApp.Infrastructure.Implementations
{
  public class IpInfoService : IIpInfoService
  {
    public async Task<IpInfo> GetIpInfo(IPAddress ip)
    {
      using var httpClient = new HttpClient();
      using var response = await httpClient.GetAsync($"https://ipinfo.io/{ip}");
      var responseText = await response.Content.ReadAsStringAsync();
      return JsonConvert.DeserializeObject<IpInfo>(responseText);
    }

  }
}
