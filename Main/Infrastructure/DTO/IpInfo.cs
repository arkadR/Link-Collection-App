namespace LinkCollectionApp.Infrastructure.DTO
{
  public class IpInfo
  {
    public string Ip { get; set; }
    public string Loc { get; set; }
    public string City { get; set; }
    public string Region { get; set; }
    public string Country { get; set; }
    public bool Bogon { get; set; }
  }
}
