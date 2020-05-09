using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using LinkCollectionApp.Infrastructure.Interfaces;
using Newtonsoft.Json;

namespace LinkCollectionApp.Infrastructure.Implementations
{
  public class IpInfoService : IIpInfoService
  {
    public async Task<string> GetUserCountryByIp(IPAddress ip)
    {
      using var httpClient = new HttpClient();
      using var response = await httpClient.GetAsync($"https://ipinfo.io/{ip}");
      var responseText = await response.Content.ReadAsStringAsync();
      var dto = JsonConvert.DeserializeObject<IpInfoResponse>(responseText);
      return dto.Bogon ? "bogon" : dto.Country; //TODO
    }

    private class IpInfoResponse
    {
      public string Ip { get; set; }
      public string Loc { get; set; }
      public string City { get; set; }
      public string Region { get; set; }
      public string Country { get; set; }
      public bool Bogon { get; set; }
    }
  }
}
