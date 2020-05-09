using LinkCollectionApp.Infrastructure.Interfaces;
using UAParser;

namespace LinkCollectionApp.Infrastructure.Implementations
{
  public class UaParserAdapter : IUaParser
  {
    private readonly Parser _parser = Parser.GetDefault();

    public ClientInfo Parse(string uaString) => _parser.Parse(uaString);
  }
}
