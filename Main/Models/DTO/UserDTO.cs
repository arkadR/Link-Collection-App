namespace LinkCollectionApp.Models.DTO
{
  public class UserDTO
  {
    public string Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }

    public static UserDTO FromApplicationUser(ApplicationUser user)
    {
      return new UserDTO { Id = user.Id, Email = user.Email, Name = user.UserName };
    }
  }
}
