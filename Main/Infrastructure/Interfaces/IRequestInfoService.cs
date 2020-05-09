using System.Threading.Tasks;
using LinkCollectionApp.Infrastructure.DTO;

namespace LinkCollectionApp.Infrastructure.Interfaces
{
  public interface IRequestInfoService
  {
    public Task<RequestInfo> GetFromCurrentRequest();
  }
}
