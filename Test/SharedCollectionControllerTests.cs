using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using LinkCollectionApp.Controllers;
using LinkCollectionApp.Models;
using LinkCollectionApp.Models.DTO;
using Microsoft.AspNetCore.Mvc;
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
      AddUser(userId);
      var collection = AddCollection(ownerId, 5);
      ShareCollection(collection.Id, userId, true);

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
    [InlineData(true)]
    [InlineData(false)]
    public void GetUserSharedCollections_CollectionSharedWithRights_ProperRightsFetched(bool editRights)
    {
      //Arrange
      var ownerId = "someOwner";
      var userId = "someUser";
      AddUser(ownerId);
      AddUser(userId);
      var collection = AddCollection(ownerId, 1);
      ShareCollection(collection.Id, userId, editRights);

      //Act
      ICollection<SharedCollection> sharedCollections = null;
      InTransaction(context =>
      {
        var controller = new SharedCollectionsController(context, GetUserProviderMock(userId));
        sharedCollections = controller.GetUserSharedCollections();
      });

      //Assert
      var singleCollection = sharedCollections.Single();
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
      collections.ForEach(c => ShareCollection(c.Id, userId, true));

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
      collectionsOfUser1.ForEach(c => ShareCollection(c.Id, user2, true));
      collectionsOfUser2.ForEach(c => ShareCollection(c.Id, user1, true));

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

    [Fact]
    public void ShareCollection_OneCollectionShared_RecordAddedToDatabase()
    {
      //Arrange
      var user1 = NewGuid;
      var user2 = NewGuid;

      AddUser(user1);
      AddUser(user2);
      var collection = AddCollection(user1, 5);

      //Act
      var sharedCollectionData = new SharedCollectionCreationData
      {
        CollectionId = collection.Id,
        EditRights = true,
        UserId = user2
      };
      InTransaction(context =>
      {
        var controller = new SharedCollectionsController(context, GetUserProviderMock(user1));
        controller.ShareCollection(sharedCollectionData);
      });

      //Assert
      InTransaction(context =>
      {
        context.SharedCollection.Should().HaveCount(1);
        context.SharedCollection.Single().UserId.Should().Be(user2);
        context.SharedCollection.Single().CollectionId.Should().Be(collection.Id);
      });
    }

    [Theory]
    [InlineData(true, true)]
    [InlineData(true, false)]
    [InlineData(false, true)]
    [InlineData(false, false)]
    public void ShareCollection_OneCollectionSharedWithRights_ProperRightsSaved(bool viewRights, bool editRights)
    {
      //Arrange
      var user1 = NewGuid;
      var user2 = NewGuid;

      AddUser(user1);
      AddUser(user2);
      var collection = AddCollection(user1, 5);

      //Act
      var sharedCollectionData = new SharedCollectionCreationData
      {
        CollectionId = collection.Id,
        EditRights = editRights,
        UserId = user2
      };
      InTransaction(context =>
      {
        var controller = new SharedCollectionsController(context, GetUserProviderMock(user1));
        controller.ShareCollection(sharedCollectionData);
      });

      //Assert
      InTransaction(context =>
      {
        var singleCollection = context.SharedCollection.Single();
        singleCollection.EditRights.Should().Be(editRights);
      });
    }

    [Fact]
    public void ShareCollection_CollectionAlreadySharedToUser_NoRecordAdded()
    {
      //Arrange
      var user1 = NewGuid;
      var user2 = NewGuid;

      AddUser(user1);
      AddUser(user2);
      var collection = AddCollection(user1, 5);

      //Act
      var sharedCollectionData = new SharedCollectionCreationData
      {
        CollectionId = collection.Id,
        EditRights = true,
        UserId = user2
      };
      InTransaction(context =>
      {
        var controller = new SharedCollectionsController(context, GetUserProviderMock(user1));
        controller.ShareCollection(sharedCollectionData);
      });
      InTransaction(context =>
      {
        var controller = new SharedCollectionsController(context, GetUserProviderMock(user1));
        controller.ShareCollection(sharedCollectionData);
      });

      //Assert
      InTransaction(context => { context.SharedCollection.Should().HaveCount(1); });
    }

    [Fact]
    public void ShareCollection_ShareCollectionOfDifferentUser_Forbidden()
    {
      //Arrange
      var user1 = NewGuid;
      var user2 = NewGuid;
      var user3 = NewGuid;

      AddUser(user1);
      AddUser(user2);
      AddUser(user3);
      var collection = AddCollection(user1, 5);

      //Act
      var sharedCollectionData = new SharedCollectionCreationData
      {
        CollectionId = collection.Id,
        EditRights = true,
        UserId = user3
      };
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new SharedCollectionsController(context, GetUserProviderMock(user2));
        result = controller.ShareCollection(sharedCollectionData);
      });

      //Assert
      result.Should().BeOfType<ForbidResult>();
    }
    [Fact]
    public void ShareCollection_ShareNotExistingCollection_NotFound()
    {
      //Arrange
      var user1 = NewGuid;
      var user2 = NewGuid;

      AddUser(user1);
      AddUser(user2);

      //Act
      var sharedCollectionData = new SharedCollectionCreationData
      {
        CollectionId = 100,
        EditRights = true,
        UserId = user2
      };
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new SharedCollectionsController(context, GetUserProviderMock(user1));
        result = controller.ShareCollection(sharedCollectionData);
      });

      //Assert
      result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public void ShareCollection_ShareCollectionToNotExistingUser_NotFound()
    {
      //Arrange
      var user1 = NewGuid;

      AddUser(user1);
      var collection = AddCollection(user1, 5);

      //Act
      var sharedCollectionData = new SharedCollectionCreationData
      {
        CollectionId = collection.Id,
        EditRights = true,
        UserId = NewGuid
      };
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new SharedCollectionsController(context, GetUserProviderMock(user1));
        result = controller.ShareCollection(sharedCollectionData);
      });

      //Assert
      result.Should().BeOfType<NotFoundResult>();
    }





    private SharedCollection ShareCollection(int collectionId, string userId, bool editRights)
    {
      var sharedCollection = new SharedCollection
      {
        CollectionId = collectionId,
        UserId = userId,
        EditRights = editRights
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
