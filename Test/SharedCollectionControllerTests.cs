using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using LinkCollectionApp.Controllers;
using LinkCollectionApp.Models;
using Xunit;

namespace LinkCollectionApp.Test
{
  public class SharedCollectionControllerTests : IntegrationTestBase
  {

    [Fact]
    public void GetUserSharedCollections_1CollectionShared_1CollectionFetched()
    {
      //Arrange
      var ownerId = "someOwner";
      var userId = "someUser";
      AddUser(ownerId);
      var collection = AddCollection(ownerId, 5);
      AddUser(userId);
      ShareCollection(collection.Id, userId, true, true);

      //Act
      ICollection<SharedCollection> sharedCollections = null;
      InTransaction(context =>
      {
        var controller = new SharedCollectionsController(context, GetUserProviderMock(userId));
        sharedCollections = controller.GetUserSharedCollections();
      });

      //Assert
      sharedCollections.Should().HaveCount(1);
      var singleCollection = sharedCollections.Single();
      singleCollection.Collection.Should().BeEquivalentTo(collection, opt => opt
        .Excluding(c => c.Elements)
        .Excluding(c => c.SavedCollections)
        .Excluding(c => c.SharedCollections));
      singleCollection.UserId.Should().Be(userId);
    }


    [Theory]
    [InlineData(true, true)]
    [InlineData(true, false)]
    [InlineData(false, true)]
    [InlineData(false, false)]
    public void GetUserSharedCollections_CollectionSharedWithRights_ProperRightsFetched(bool viewRights, bool editRights)
    {
      //Arrange
      var ownerId = "someOwner";
      var userId = "someUser";
      AddUser(ownerId);
      var collection = AddCollection(ownerId, 1);
      AddUser(userId);
      ShareCollection(collection.Id, userId, viewRights, editRights);

      //Act
      ICollection<SharedCollection> sharedCollections = null;
      InTransaction(context =>
      {
        var controller = new SharedCollectionsController(context, GetUserProviderMock(userId));
        sharedCollections = controller.GetUserSharedCollections();
      });

      //Assert
      var singleCollection = sharedCollections.Single();
      singleCollection.ViewRights.Should().Be(viewRights);
      singleCollection.EditRights.Should().Be(editRights);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(5)]
    [InlineData(100)]
    [InlineData(1000)]
    public void GetUserSharedCollections_XCollectionsShared_XCollectionFetched(int numOfCollections)
    {
      //Arrange
      var ownerId = "someOwner";
      var userId = "someUser";
      AddUser(ownerId);
      AddUser(userId);

      var collections = Enumerable.Range(0, numOfCollections)
        .Select(i => AddCollection(ownerId, 5))
        .ToList();
      collections.ForEach(c => ShareCollection(c.Id, userId, true, true));

      //Act
      List<SharedCollection> sharedCollections = null;
      InTransaction(context =>
      {
        var controller = new SharedCollectionsController(context, GetUserProviderMock(userId));
        sharedCollections = controller.GetUserSharedCollections().ToList();
      });

      //Assert
      sharedCollections.Should().HaveCount(numOfCollections);
      sharedCollections.ForEach(sc => sc.UserId.Should().Be(userId));
    }


    [Theory]
    [InlineData(0, 10)]
    [InlineData(10, 10)]
    [InlineData(100, 0)]
    [InlineData(100, 200)]
    [InlineData(1, 200)]
    public void GetUserSharedCollections_CollectionsSharedForBothUsers_FetchingOnlyUserCollections
      (int numCollectionsOfUser1, int numCollectionsOfUser2)
    {
      //Arrange
      var user1 = NewGuid;
      var user2 = NewGuid;
      AddUser(user1);
      AddUser(user2);

      var collectionsOfUser1 = Enumerable.Range(0, numCollectionsOfUser1)
        .Select(i => AddCollection(user1, 5))
        .ToList();
      var collectionsOfUser2 = Enumerable.Range(0, numCollectionsOfUser2)
        .Select(i => AddCollection(user2, 5))
        .ToList();
      collectionsOfUser1.ForEach(c => ShareCollection(c.Id, user2, true, true));
      collectionsOfUser2.ForEach(c => ShareCollection(c.Id, user1, true, true));

      //Act
      List<SharedCollection> sharedCollectionsOfUser1 = null;
      List<SharedCollection> sharedCollectionsOfUser2 = null;
      InTransaction(context =>
      {
        var controller = new SharedCollectionsController(context, GetUserProviderMock(user1));
        sharedCollectionsOfUser1 = controller.GetUserSharedCollections().ToList();
      });
      InTransaction(context =>
      {
        var controller = new SharedCollectionsController(context, GetUserProviderMock(user2));
        sharedCollectionsOfUser2 = controller.GetUserSharedCollections().ToList();
      });

      //Assert
      sharedCollectionsOfUser1.Should().HaveCount(numCollectionsOfUser2);
      sharedCollectionsOfUser2.Should().HaveCount(numCollectionsOfUser1);
      sharedCollectionsOfUser1.ForEach(sc => sc.UserId.Should().Be(user1));
      sharedCollectionsOfUser2.ForEach(sc => sc.UserId.Should().Be(user2));
    }




    private SharedCollection ShareCollection(int collectionId, string userId, bool viewRights, bool editRights)
    {
      var sharedCollection = new SharedCollection
      {
        CollectionId = collectionId,
        UserId = userId,
        EditRights = editRights,
        ViewRights = viewRights
      };
      InTransaction(context =>
      {
        context.SharedCollection.Add(sharedCollection);
        context.SaveChanges();
      });
      return sharedCollection;
    }
  }
}
