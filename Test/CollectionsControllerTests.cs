using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using LinkCollectionApp.Controllers;
using LinkCollectionApp.Models;
using LinkCollectionApp.Models.DTO;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace LinkCollectionApp.Test
{
  public class CollectionsControllerTests : IntegrationTestBase
  {
    [Theory]
    [InlineData("TestUserId")]
    public void GetUserCollections_UserWithoutCollections_NoCollections(string userId)
    {
      //Arrange
      AddUser(userId);

      //Act
      ICollection<Collection> collections = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId));
        collections = controller.GetUserCollections();
      });

      //Assert 
      collections.Should().BeEmpty();
    }

    [Theory]
    [InlineData(0)]
    [InlineData(1)]
    [InlineData(2)]
    [InlineData(100)]
    [InlineData(1000)]
    public void GetUserCollections_UserWithXCollections_XCollectionsReturned(int numberOfCollections)
    {
      //Arrange
      var userId = NewGuid;
      AddUser(userId);
      for (var i = 0; i < numberOfCollections; i++)
      {
        AddCollection(userId, 0);
      }

      //Act
      ICollection<Collection> collections = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId));
        collections = controller.GetUserCollections();
      });

      //Assert 
      collections.Should().HaveCount(numberOfCollections);
    }

    [Theory]
    [InlineData(0)]
    [InlineData(1)]
    [InlineData(2)]
    [InlineData(100)]
    [InlineData(1000)]
    public void GetUserCollections_CollectionsWithoutElements_NoElementsReturned(int numberOfCollections)
    {
      //Arrange
      var userId = NewGuid;
      AddUser(userId);
      for (var i = 0; i < numberOfCollections; i++)
      {
        AddCollection(userId, 0);
      }

      //Act
      ICollection<Collection> collections = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId));
        collections = controller.GetUserCollections();
      });

      //Assert 
      collections.SelectMany(c => c.Elements).Should().BeEmpty();
    }

    [Theory]
    [InlineData(0)]
    [InlineData(1)]
    [InlineData(2)]
    [InlineData(100)]
    [InlineData(1000)]
    public void GetUserCollections_CollectionHasElements_ElementsReturned(int numberOfElements)
    {
      //Arrange
      var userId = NewGuid;
      AddUser(userId);
      AddCollection(userId, numberOfElements);

      //Act
      ICollection<Collection> collections = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId));
        collections = controller.GetUserCollections();
      });

      //Assert 
      collections.Single().Elements.Should().HaveCount(numberOfElements);
    }


    [Theory]
    [InlineData("SomeCollection")]
    [InlineData("1234567890")]
    public void AddCollection_PrivateCollection_CollectionAddedToDb(string collectionName)
    {
      //Arrange
      var collectionData = new CollectionCreationData {IsPublic = false, Name = collectionName};
      var userId = NewGuid;
      AddUser(userId);

      //Act
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId));
        controller.AddCollection(collectionData);
      });

      //Assert 
      InTransaction(context =>
      {
        var collection = context.Collection.SingleOrDefault(c => c.Name == collectionName);
        collection.Should().NotBeNull();
        collection.IsPublic.Should().BeFalse();
      });
    }

    [Theory]
    [InlineData("SomeCollection")]
    [InlineData("1234567890")]
    public void AddCollection_PublicCollection_CollectionAddedToDb(string collectionName)
    {
      //Arrange
      var collectionData = new CollectionCreationData { IsPublic = true, Name = collectionName };
      var userId = NewGuid;
      AddUser(userId);

      //Act
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId));
        controller.AddCollection(collectionData);
      });

      //Assert 
      InTransaction(context =>
      {
        var collection = context.Collection.SingleOrDefault(c => c.Name == collectionName);
        collection.Should().NotBeNull();
        collection.IsPublic.Should().BeTrue();
      });
    }


    [Theory]
    [InlineData("SomeCollection")]
    [InlineData("1234567890")]
    public void AddCollection_PublicCollection_CollectionAssignedToUser(string collectionName)
    {
      //Arrange
      var collectionData = new CollectionCreationData { IsPublic = true, Name = collectionName };
      var userId = NewGuid;
      AddUser(userId);

      //Act
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId));
        controller.AddCollection(collectionData);
      });

      //Assert 
      InTransaction(context =>
      {
        var collectionFromContext = context.Collection.SingleOrDefault(c => c.Name == collectionName);
        var collectionFromUser = context.ApplicationUser
          .Include(u => u.Collections)
          .Single(u => u.Id == userId).Collections
          .Single(c => c.Name == collectionName);
        collectionFromContext.Should().BeEquivalentTo(collectionFromUser);
        collectionFromContext.OwnerId.Should().Be(userId);
      });
    }
  }
}
