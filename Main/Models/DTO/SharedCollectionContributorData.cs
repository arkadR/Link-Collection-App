namespace LinkCollectionApp.Models.DTO
{
  public class SharedCollectionContributorData
  {
    public int CollectionId { get; set; }
    public string UserId { get; set; }
    public bool EditRights { get; set; }
    public virtual UserSimpleData User { get; set; }

    public static SharedCollectionContributorData Create(SharedCollection sharedCollection)
    {
      var user = UserSimpleData.Create(sharedCollection.User);
      return new SharedCollectionContributorData { CollectionId = sharedCollection.CollectionId, EditRights = sharedCollection.EditRights, User = user, UserId = user.Id };
    }
  }
}
