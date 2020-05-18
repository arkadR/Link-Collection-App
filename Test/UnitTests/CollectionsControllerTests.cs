using System.Collections.Generic;
using System.Linq;
using FluentAssertions;
using LinkCollectionApp.Controllers;
using LinkCollectionApp.Models;
using LinkCollectionApp.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace LinkCollectionApp.Test.UnitTests
{
  public class CollectionsControllerTests : UnitTestBase
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
        var controller = new CollectionsController(context, GetUserProviderMock(userId), getCollectionConfigurationProviderMock());
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
        var controller = new CollectionsController(context, GetUserProviderMock(userId), getCollectionConfigurationProviderMock());
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
        var controller = new CollectionsController(context, GetUserProviderMock(userId), getCollectionConfigurationProviderMock());
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
        var controller = new CollectionsController(context, GetUserProviderMock(userId), getCollectionConfigurationProviderMock());
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
        var controller = new CollectionsController(context, GetUserProviderMock(userId), getCollectionConfigurationProviderMock());
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
        var controller = new CollectionsController(context, GetUserProviderMock(userId), getCollectionConfigurationProviderMock());
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
        var controller = new CollectionsController(context, GetUserProviderMock(userId), getCollectionConfigurationProviderMock());
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

    [Theory]
    [InlineData("CollectionName", "CollectionName")]
    [InlineData("oldName", "newName")]
    [InlineData("collectionname", "COLLECTIONNAME")]
    public void UpdateCollection_NewNameProvided_CollectionNameUpdated(string initialName, string newName)
    {
      //Arrange
      var userId = NewGuid;
      AddUser(userId);
      var collection = AddCollection(userId, 5, initialName);
      var collectionData = new CollectionUpdateData { Name = newName };

      //Act
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId), getCollectionConfigurationProviderMock());
        controller.UpdateCollection(collection.Id, collectionData);
      });

      //Assert 
      InTransaction(context =>
      {
        var collectionFromContext = context.Collection.Single();
        collectionFromContext.Name.Should().Be(newName);
      });
    }

    [Theory]
    [InlineData("CollectionDescription", "CollectionDescription")]
    [InlineData("initialDescription", "newDescription")]
    [InlineData("description", "DESCRIPTION")]
    public void UpdateCollection_NewDescriptionProvided_CollectionDescriptionUpdated(string initialDescription, string newDescription)
    {
      //Arrange
      var userId = NewGuid;
      AddUser(userId);
      var collection = AddCollection(userId, 5, description: initialDescription);
      var collectionData = new CollectionUpdateData { Description = newDescription };

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId), getCollectionConfigurationProviderMock());
        result = controller.UpdateCollection(collection.Id, collectionData);
      });

      //Assert 
      result.Should().BeOfType<OkResult>();
      InTransaction(context =>
      {
        var collectionFromContext = context.Collection.Single();
        collectionFromContext.Description.Should().Be(newDescription);
      });
    }


    [Theory]
    [InlineData("NEWNAME", "NEWDESCRIPTION")]
    [InlineData("NEWNAME", null)]
    [InlineData(null, "NEWDESCRIPTION")]
    [InlineData(null, null)]
    public void UpdateCollection_MultipleFieldsUpdate_ProperlyUpdated(string newName, string newDescription)
    {
      //Arrange
      var userId = NewGuid;
      AddUser(userId);
      var collection = AddCollection(userId, 5);
      var collectionData = new CollectionUpdateData { Description = newDescription, Name = newName };

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId), getCollectionConfigurationProviderMock());
        result = controller.UpdateCollection(collection.Id, collectionData);
      });

      //Assert 
      result.Should().BeOfType<OkResult>();
      InTransaction(context =>
      {
        var collectionFromContext = context.Collection.Single();
        collectionFromContext.Description.Should().Be(newDescription ?? collection.Description);
        collectionFromContext.Name.Should().Be(newName ?? collection.Name);
      });
    }

    [Fact]
    public void UpdateCollection_CollectionDoesntExist_NotFound()
    {
      //Arrange
      var userId = NewGuid;
      AddUser(userId);
      var collection = AddCollection(userId, 5);
      var collectionData = new CollectionUpdateData { Description = NewGuid, Name = NewGuid};

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId), getCollectionConfigurationProviderMock());
        result = controller.UpdateCollection(collection.Id + 1, collectionData);
      });

      //Assert 
      result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public void UpdateCollection_CollectionNotOwnedByUserAndNoEditRights_Forbidden()
    {
      //Arrange
      var userId = NewGuid;
      AddUser(userId);
      var collection = AddCollection(userId, 5);
      var collectionData = new CollectionUpdateData { Description = NewGuid, Name = NewGuid };

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(NewGuid), getCollectionConfigurationProviderMock());
        result = controller.UpdateCollection(collection.Id, collectionData);
      });

      //Assert 
      result.Should().BeOfType<ForbidResult>();
    }

    [Fact]
    public void UpdateCollection_CollectionSharedButNoEditRights_Forbid()
    {
      //Arrange
      var userId1 = NewGuid;
      var userId2 = NewGuid;
      AddUser(userId1);
      AddUser(userId2);
      var collection = AddCollection(userId1, 5);
      ShareCollection(collection.Id, userId2, false);
      var collectionData = new CollectionUpdateData { Description = NewGuid, Name = NewGuid };

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId2), getCollectionConfigurationProviderMock());
        result = controller.UpdateCollection(collection.Id, collectionData);
      });

      //Assert 
      result.Should().BeOfType<ForbidResult>();
    }

    [Fact]
    public void UpdateCollection_CollectionNotOwnedByUserButHasEditRights_Ok()
    {
      //Arrange
      var userId1 = NewGuid;
      var userId2 = NewGuid;
      AddUser(userId1);
      AddUser(userId2);
      var collection = AddCollection(userId1, 5);
      ShareCollection(collection.Id, userId2, true);
      var collectionData = new CollectionUpdateData { Description = NewGuid, Name = NewGuid };

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId2), getCollectionConfigurationProviderMock());
        result = controller.UpdateCollection(collection.Id, collectionData);
      });

      //Assert 
      result.Should().BeOfType<OkResult>();
    }

    [Fact]
    public void DeleteCollection_CollectionNotOwnedByUser_Forbidden()
    {
      //Arrange
      var userId1 = NewGuid;
      var userId2 = NewGuid;
      AddUser(userId1);
      AddUser(userId2);
      var collection = AddCollection(userId1, 5);

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId2), getCollectionConfigurationProviderMock());
        result = controller.DeleteCollection(collection.Id);
      });

      //Assert 
      result.Should().BeOfType<ForbidResult>();
    }

    [Fact]
    public void DeleteCollection_CollectionNotOwnedByUserButHasUserRights_Forbidden()
    {
      //Arrange
      var userId1 = NewGuid;
      var userId2 = NewGuid;
      AddUser(userId1);
      AddUser(userId2);
      var collection = AddCollection(userId1, 5);
      ShareCollection(collection.Id, userId2, true);

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId2), getCollectionConfigurationProviderMock());
        result = controller.DeleteCollection(collection.Id);
      });

      //Assert 
      result.Should().BeOfType<ForbidResult>();
    }

    [Fact]
    public void DeleteCollection_CollectionOwnedByUser_CollectionDeleted()
    {
      //Arrange
      var userId = NewGuid;
      AddUser(userId);
      var collection = AddCollection(userId, 5);

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId), getCollectionConfigurationProviderMock());
        result = controller.DeleteCollection(collection.Id);
      });

      //Assert 
      result.Should().BeOfType<OkResult>();
      InTransaction(context =>
      {
        var collections = context.Collection.ToList();
        collections.Should().BeEmpty();
      });
    }

    [Fact]
    public void DeleteCollection_UserHasMultipleCollections_Only1CollectionDeleted()
    {
      //Arrange
      var userId = NewGuid;
      var collectionToDeleteName = NewGuid;
      AddUser(userId);
      var collection = AddCollection(userId, 5, name: collectionToDeleteName);
      for (var i = 0; i < 10; i++)
        AddCollection(userId, 5);

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId), getCollectionConfigurationProviderMock());
        result = controller.DeleteCollection(collection.Id);
      });

      //Assert 
      result.Should().BeOfType<OkResult>();
      InTransaction(context =>
      {
        var collections = context.Collection.ToList();
        collections.Should().HaveCount(10);
        collections.Where(c => c.Id == collection.Id).Should().HaveCount(0);
        collections.Where(c => c.Name == collectionToDeleteName).Should().HaveCount(0);
      });
    }


    [Theory]
    [InlineData(0)]
    [InlineData(1)]
    [InlineData(5)]
    [InlineData(100)]
    public void DeleteCollection_CollectionHasNElements_AllElementsDeleted(int elementCount)
    {
      //Arrange
      var userId = NewGuid;
      AddUser(userId);
      var collection = AddCollection(userId, elementCount);

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId), getCollectionConfigurationProviderMock());
        result = controller.DeleteCollection(collection.Id);
      });

      //Assert 
      result.Should().BeOfType<OkResult>();
      InTransaction(context =>
      {
        var elements = context.Element.ToList();
        elements.Should().BeEmpty();
      });
    }


    [Fact]
    public void DeleteCollection_CollectionIsShared_SharedCollectionDeleted()
    {
      //Arrange
      var userId1 = NewGuid;
      var userId2 = NewGuid;
      AddUser(userId1);
      AddUser(userId2);
      var collection = AddCollection(userId1, 5);
      ShareCollection(collection.Id, userId2, true);

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId1), getCollectionConfigurationProviderMock());
        result = controller.DeleteCollection(collection.Id);
      });

      //Assert 
      result.Should().BeOfType<OkResult>();
      InTransaction(context =>
      {
        var sharedCollections = context.SharedCollection.ToList();
        sharedCollections.Should().BeEmpty();
      });
    }

    [Fact]
    public void DeleteCollection_CollectionIsSaved_SavedCollectionDeleted()
    {
      //Arrange
      var userId1 = NewGuid;
      var userId2 = NewGuid;
      AddUser(userId1);
      AddUser(userId2);
      var collection = AddCollection(userId1, 5);
      SaveCollection(collection.Id, userId2);

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId1), getCollectionConfigurationProviderMock());
        result = controller.DeleteCollection(collection.Id);
      });

      //Assert 
      result.Should().BeOfType<OkResult>();
      InTransaction(context =>
      {
        var savedCollections = context.SavedCollection.ToList();
        savedCollections.Should().BeEmpty();
      });
    }

    [Fact]
    public void MakePublic_OnPrivateCollection_IsPublicUpdated()
    {
      //Arrange
      var userId1 = NewGuid;
      AddUser(userId1);
      var collection = AddCollection(userId1, 5);

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId1), getCollectionConfigurationProviderMock());
        result = controller.MakePublic(collection.Id);
      });

      //Assert 
      result.Should().BeOfType<OkResult>();
      InTransaction(context =>
      {
        context.Collection.Single(c => c.Id == collection.Id).IsPublic.Should().BeTrue();
      });
    }

    [Fact]
    public void MakePublic_OnPublicCollection_OkNoChanges()
    {
      //Arrange
      var userId1 = NewGuid;
      AddUser(userId1);
      var collection = AddCollection(userId1, 5);
      InTransaction(context =>
      {
        context.Collection.Single(c => c.Id == collection.Id).IsPublic = true;
        context.SaveChanges();
      });

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId1), getCollectionConfigurationProviderMock());
        result = controller.MakePublic(collection.Id);
      });

      //Assert 
      result.Should().BeOfType<OkResult>();
      InTransaction(context =>
      {
        context.Collection.Single(c => c.Id == collection.Id).IsPublic.Should().BeTrue();
      });
    }

    [Fact]
    public void MakePublic_OnOtherUserCollection_Forbidden()
    {
      //Arrange
      var userId1 = NewGuid;
      var userId2 = NewGuid;
      AddUser(userId1);
      AddUser(userId2);
      var collection = AddCollection(userId1, 5);

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId2), getCollectionConfigurationProviderMock());
        result = controller.MakePublic(collection.Id);
      });

      //Assert 
      result.Should().BeOfType<ForbidResult>();
      InTransaction(context =>
      {
        context.Collection
          .Single(c => c.Id == collection.Id)
          .IsPublic.Should().BeFalse();
      });
    }

    [Fact]
    public void MakePublic_CollectionDoesNotExist_NotFound()
    {
      //Arrange
      var userId1 = NewGuid;
      AddUser(userId1);

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId1), getCollectionConfigurationProviderMock());
        result = controller.MakePublic(1010);
      });

      //Assert 
      result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public void MakePublic_CollaboratorHasEditRights_Forbidden()
    {
      //Arrange
      var userId1 = NewGuid;
      var userId2 = NewGuid;
      AddUser(userId1);
      AddUser(userId2);
      var collection = AddCollection(userId1, 5);
      ShareCollection(collection.Id, userId2, true);

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new CollectionsController(context, GetUserProviderMock(userId2), getCollectionConfigurationProviderMock());
        result = controller.MakePublic(collection.Id);
      });

      //Assert 
      result.Should().BeOfType<ForbidResult>();
      InTransaction(context =>
      {
        context.Collection
          .Single(c => c.Id == collection.Id)
          .IsPublic.Should().BeFalse();
      });
    }

  }
}
