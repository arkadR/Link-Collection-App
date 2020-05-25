using System.Collections.Generic;
using System.Linq;

namespace LinkCollectionApp.Models.DTO
{
  public class UserDTO
  {
    public string Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public bool? IsLockedOut { get; set; }
    public List<string> Roles { get; set; }
  }
}
