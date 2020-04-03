using System;
using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using LinkCollectionApp.Controllers;
using LinkCollectionApp.Infrastructure.Interfaces;
using LinkCollectionApp.Models;
using Microsoft.EntityFrameworkCore;
using Moq;
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
      var userId = Guid.NewGuid().ToString();
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
      var userId = Guid.NewGuid().ToString();
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
      collections.SelectMany(c => c.Element).Should().BeEmpty();
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
      var userId = Guid.NewGuid().ToString();
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
      collections.Single().Element.Should().HaveCount(numberOfElements);
    }


    [Theory]
    [InlineData("SomeCollection")]
    [InlineData("1234567890")]
    public void AddCollection_PrivateCollection_CollectionAddedToDb(string collectionName)
    {
      //Arrange
      var collectionData = new CollectionCreationData {IsPublic = false, Name = collectionName};
      var userId = Guid.NewGuid().ToString();
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
      var userId = Guid.NewGuid().ToString();
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
      var userId = Guid.NewGuid().ToString();
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
          .Include(u => u.Collection)
          .Single(u => u.Id == userId).Collection
          .Single(c => c.Name == collectionName);
        collectionFromContext.Should().BeEquivalentTo(collectionFromUser);
        collectionFromContext.OwnerId.Should().Be(userId);
      });
    }



    //TODO[AR]: Move to a setup class
    private void AddUser(string userId)
    {
      InTransaction(context =>
      {
        context.ApplicationUser.Add(new ApplicationUser
        {
          Id = userId,
          UserName = Guid.NewGuid().ToString(),
          Email = $"{userId}@test.com"
        });
        context.SaveChanges();
      });
    }

    private void AddCollection(string ownerId, int numOfElements)
    {
      InTransaction(context =>
      {
        context.Add(new Collection
        {
          OwnerId = ownerId,
          Description = Guid.NewGuid().ToString(),
          Element = Enumerable.Range(0, numOfElements).Select(num => new Element
          {
            Name = Guid.NewGuid().ToString()
          }).ToList()
        });
        context.SaveChanges();
      });
    }

    private IUserContextProvider GetUserProviderMock(string userId)
    {
      var userProviderMock = new Mock<IUserContextProvider>();
      userProviderMock.Setup(m => m.GetCurrentUserId()).Returns(userId);
      return userProviderMock.Object;
    }
  }
}
