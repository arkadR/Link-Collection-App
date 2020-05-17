using System.Collections.Generic;
using System.Linq;

namespace LinkCollectionApp.Models.DTO
{
  public class UserDtoBuilder
  {
    private string Id { get; set; }
    private string Name { get; set; }
    private string Email { get; set; }
    private IList<string> Roles { get; set; }

    public static UserDtoBuilder FromApplicationUser(ApplicationUser user)
    {
      return new UserDtoBuilder
      {
        Id = user.Id,
        Name = user.UserName,
        Email = user.Email
      };
    }

    public UserDtoBuilder WithRoles(IList<string> roles)
    {
      return new UserDtoBuilder
      {
        Id = Id,
        Name = Name,
        Email = Email,
        Roles = roles
      };
    }

    public UserDTO Create()
    {
      return new UserDTO
      {
        Id = Id,
        Email = Email,
        Name = Name,
        Roles = Roles?.ToList() ?? new List<string>()
      };
    }
  }
}
