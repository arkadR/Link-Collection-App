using System.Net;
using System.Threading.Tasks;
using LinkCollectionApp.Infrastructure.DTO;

namespace LinkCollectionApp.Infrastructure.Interfaces
{
  public interface IIpInfoService
  {
    public Task<IpInfo> GetIpInfo(IPAddress ip);
  }
}
