using System.Threading.Tasks;
using LinkCollectionApp.Infrastructure.DTO;
using LinkCollectionApp.Infrastructure.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.Net.Http.Headers;

namespace LinkCollectionApp.Infrastructure.Implementations
{
  public class RequestInfoService : IRequestInfoService
  {
    private readonly IHttpContextAccessor _httpContextAccessor;
    private readonly IUaParser _parser;
    private readonly IIpInfoService _ipInfoService;

    public RequestInfoService(IHttpContextAccessor httpContextAccessor, IUaParser parser, IIpInfoService ipInfoService)
    {
      _httpContextAccessor = httpContextAccessor;
      _parser = parser;
      _ipInfoService = ipInfoService;
    }

    public async Task<RequestInfo> GetFromCurrentRequest()
    {
      //TODO: Validate, try/catch
      var httpContext = _httpContextAccessor.HttpContext;
      var agents = httpContext.Request.Headers[HeaderNames.UserAgent];
      var clientInfo = _parser.Parse(agents[0]);
      var country = await _ipInfoService.GetUserCountryByIp(httpContext.Connection.RemoteIpAddress);
      return new RequestInfo
      {
        OriginCountry = country,
        ClientInfo = clientInfo
      };
    }
  }
}
