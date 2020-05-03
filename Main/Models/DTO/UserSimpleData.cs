namespace LinkCollectionApp.Models.DTO
{
  public class UserSimpleData
  {
    public string Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }

    public static UserSimpleData Create(ApplicationUser user)
    {
      return new UserSimpleData { Id = user.Id, Email = user.Email, Name = user.UserName };
    }
  }
}
