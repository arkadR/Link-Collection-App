namespace LinkCollectionApp.Models.DTO
{
  public class CollectionContributorDTO
  {
    public int CollectionId { get; set; }
    public string UserId { get; set; }
    public bool EditRights { get; set; }
    public virtual UserDTO User { get; set; }

    public static CollectionContributorDTO FromSharedCollection(SharedCollection sharedCollection)
    {
      var user = UserDtoBuilder.FromApplicationUser(sharedCollection.User).Create();
      return new CollectionContributorDTO 
      { 
        CollectionId = sharedCollection.CollectionId, 
        EditRights = sharedCollection.EditRights, 
        User = user, 
        UserId = user.Id 
      };
    }
  }
}
