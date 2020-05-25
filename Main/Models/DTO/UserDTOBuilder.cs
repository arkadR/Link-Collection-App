using System.Collections.Generic;
using System.Linq;
using LinkCollectionApp.Extensions;

namespace LinkCollectionApp.Models.DTO
{
  public class UserDtoBuilder
  {
    private string Id { get; set; }
    private string Name { get; set; }
    private string Email { get; set; }
    private bool IsLockedOut { get; set; }
    private bool IncludeLockInfo { get; set; } = false;
    private IList<string> Roles { get; set; }

    public static UserDtoBuilder FromApplicationUser(ApplicationUser user)
    {
      return new UserDtoBuilder
      {
        Id = user.Id,
        Name = user.UserName,
        Email = user.Email,
        IsLockedOut = user.IsLockedOut()
      };
    }

    public UserDtoBuilder IncludeLockoutInfo()
    {
      return new UserDtoBuilder
      {
        Id = Id,
        Name = Name,
        Email = Email,
        IsLockedOut = IsLockedOut,
        IncludeLockInfo = true
      };
    }

    public UserDtoBuilder WithRoles(IList<string> roles)
    {
      return new UserDtoBuilder
      {
        Id = Id,
        Name = Name,
        Email = Email,
        IsLockedOut = IsLockedOut,
        IncludeLockInfo = IncludeLockInfo,
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
        IsLockedOut = IncludeLockInfo ? IsLockedOut : null as bool?,
        Roles = Roles?.ToList() ?? new List<string>()
      };
    }
  }
}
