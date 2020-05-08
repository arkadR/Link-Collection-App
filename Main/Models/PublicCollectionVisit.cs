using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace LinkCollectionApp.Models
{
  public partial class PublicCollectionVisit
  {
    public int Id { get; set; }
    public string DeviceOS { get; set; }
    public string BrowserName { get; set; }
    public string Country { get; set; }
  }
}
