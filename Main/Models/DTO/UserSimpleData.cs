namespace LinkCollectionApp.Models.DTO
{
  public class UserSimpleData
  {
    public string UserId { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }

    public static UserSimpleData Create(ApplicationUser user)
    {
      return new UserSimpleData { UserId = user.Id, Email = user.Email, Name = user.UserName };
    }
  }
}
