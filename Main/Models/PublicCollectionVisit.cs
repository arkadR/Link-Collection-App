using System;

namespace LinkCollectionApp.Models
{
  public partial class PublicCollectionVisit
  {
    public int Id { get; set; }
    public int CollectionId { get; set; }
    public DateTime Date { get; set; }
    public string DeviceOS { get; set; }
    public string BrowserName { get; set; }
    public string Country { get; set; }
  }
}
