using System.Linq;
using FluentAssertions;
using LinkCollectionApp.Controllers;
using LinkCollectionApp.Models;
using LinkCollectionApp.Models.DTO;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Xunit;

namespace LinkCollectionApp.Test
{
  public class ElementsControllerTests : IntegrationTestBase
  {
    [Theory]
    [InlineData("NewElement", "stackoverflow.com")]
    [InlineData("NewElement", "NewElement")]
    [InlineData("12345", "31276")]
    public void AddElement_NewElementData_AllPropertiesInserted(string elementName, string link)
    {
      //Arrange
      var userId = NewGuid;
      AddUser(userId);
      var collection = AddCollection(userId, 0);
      var elementData = new ElementCreationData { CollectionId = collection.Id, Link = link, Name = elementName};

      //Act
      InTransaction(context =>
      {
        var controller = new ElementsController(context, GetUserProviderMock(userId));
        controller.AddElement(elementData);
      });

      //Assert
      InTransaction(context =>
      {
        var element = context.Element.SingleOrDefault(el => el.Name == elementName);
        element.Should().NotBeNull();
        element.Name.Should().Be(elementName);
        element.Link.Should().Be(link);
        element.CollectionId.Should().Be(collection.Id);
        element.OwnerId.Should().Be(userId);
      });
    }

    [Theory]
    [InlineData("NewElement", "stackoverflow.com")]
    [InlineData("NewElement", "NewElement")]
    [InlineData("12345", "31276")]
    public void AddElement_FirstElementInCollection_SequenceEquals1(string elementName, string link)
    {
      //Arrange
      var userId = NewGuid;
      AddUser(userId);
      var collection = AddCollection(userId, 0);
      var elementData = new ElementCreationData { CollectionId = collection.Id, Link = link, Name = elementName };

      //Act
      InTransaction(context =>
      {
        var controller = new ElementsController(context, GetUserProviderMock(userId));
        controller.AddElement(elementData);
      });

      //Assert
      InTransaction(context =>
      {
        var element = context.Element.Single(el => el.Name == elementName);
        element.Sequence.Should().Be(1);
      });
    }

    [Fact]
    public void AddElement_100ElementsInserted_SequenceConserved()
    {
      //Arrange
      var userId = NewGuid;
      AddUser(userId);
      var collection = AddCollection(userId, 0);

      //Act
      InTransaction(context =>
      {
        var controller = new ElementsController(context, GetUserProviderMock(userId));
        for (var i = 0; i < 100; i++)
        {
          var elementData = new ElementCreationData { CollectionId = collection.Id, Link = NewGuid, Name = i.ToString() };
          controller.AddElement(elementData);
        }
      });

      //Assert
      InTransaction(context =>
      {
        var elements = context.Collection
          .Include(c => c.Elements)
          .Single(c => c.Id == collection.Id)
          .Elements.OrderBy(el => int.Parse(el.Name))
          .ToList();
        elements.Should().HaveCount(100);
        elements.Max(el => el.Sequence).Should().Be(100);
        elements.Select(el => el.Sequence).Should().BeInAscendingOrder();
      });
    }

    [Fact]
    public void UpdateElement_NewName_NameUpdated()
    {
      //Arrange
      var userId = NewGuid;
      var newName = NewGuid;
      var updateData = new ElementUpdateData { Name = newName };
      AddUser(userId);
      AddCollection(userId, 5);
      Element element = null;
      InTransaction(context =>
      {
        element = context.Element.First();
      });

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new ElementsController(context, GetUserProviderMock(userId));
        result = controller.UpdateElement(element.Id, updateData);
      });

      //Assert
      result.Should().BeOfType<OkResult>();
      InTransaction(context =>
      {
        context.Element.Single(el => el.Id == element.Id).Name.Should().Be(newName);
      });
    }

    [Fact]
    public void UpdateElement_NewLink_LinkUpdated()
    {
      //Arrange
      var userId = NewGuid;
      var newLink = NewGuid;
      var updateData = new ElementUpdateData { Link = newLink };
      AddUser(userId);
      AddCollection(userId, 50);
      Element element = null;
      InTransaction(context =>
      {
        element = context.Element.First();
      });

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new ElementsController(context, GetUserProviderMock(userId));
        result = controller.UpdateElement(element.Id, updateData);
      });

      //Assert
      result.Should().BeOfType<OkResult>();
      InTransaction(context =>
      {
        context.Element.Single(el => el.Id == element.Id).Link.Should().Be(newLink);
      });
    }

    [Theory]
    [InlineData("NEWNAME", "NEWLINK")]
    [InlineData("NEWNAME", null)]
    [InlineData(null, "NEWLINK")]
    public void UpdateElement_MixedUpdateData_ProperFieldsUpdated(string newName, string newLink)
    {
      //Arrange
      var userId = NewGuid;
      var updateData = new ElementUpdateData { Link = newLink, Name = newName};
      AddUser(userId);
      AddCollection(userId, 50);
      Element element = null;
      InTransaction(context =>
      {
        element = context.Element.First();
      });

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new ElementsController(context, GetUserProviderMock(userId));
        result = controller.UpdateElement(element.Id, updateData);
      });

      //Assert
      result.Should().BeOfType<OkResult>();
      InTransaction(context =>
      {
        context.Element.Single(el => el.Id == element.Id).Link.Should().Be(newLink ?? element.Link);
        context.Element.Single(el => el.Id == element.Id).Name.Should().Be(newName ?? element.Name);
      });
    }

    [Fact]
    public void UpdateElement_ElementDoesNotExist_NotFound()
    {
      //Arrange
      var userId = NewGuid;
      var newLink = NewGuid;
      var updateData = new ElementUpdateData { Link = newLink };
      AddUser(userId);
      AddCollection(userId, 1);
      Element element = null;
      InTransaction(context =>
      {
        element = context.Element.First();
      });

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new ElementsController(context, GetUserProviderMock(userId));
        result = controller.UpdateElement(element.Id + 1, updateData);
      });

      //Assert
      result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public void UpdateElement_CollectionNotOwnedByUserAndNotShared_Forbidden()
    {
      //Arrange
      var userId1 = NewGuid;
      var userId2 = NewGuid;
      var newLink = NewGuid;
      var updateData = new ElementUpdateData { Link = newLink };
      AddUser(userId1);
      AddUser(userId2);
      AddCollection(userId1, 50);
      Element element = null;
      InTransaction(context =>
      {
        element = context.Element.First();
      });

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new ElementsController(context, GetUserProviderMock(userId2));
        result = controller.UpdateElement(element.Id, updateData);
      });

      //Assert
      result.Should().BeOfType<ForbidResult>();
    }

    [Fact]
    public void UpdateElement_CollectionNotOwnedByUserButHasViewRights_Forbidden()
    {
      //Arrange
      var userId1 = NewGuid;
      var userId2 = NewGuid;
      var newLink = NewGuid;
      var updateData = new ElementUpdateData { Link = newLink };
      AddUser(userId1);
      AddUser(userId2);
      var collection = AddCollection(userId1, 50);
      ShareCollection(collection.Id, userId2, false);
      Element element = null;
      InTransaction(context =>
      {
        element = context.Element.First();
      });

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new ElementsController(context, GetUserProviderMock(userId2));
        result = controller.UpdateElement(element.Id, updateData);
      });

      //Assert
      result.Should().BeOfType<ForbidResult>();
    }

    [Fact]
    public void UpdateElement_CollectionNotOwnedByUserButHasEditRights_Ok()
    {
      //Arrange
      var userId1 = NewGuid;
      var userId2 = NewGuid;
      var newLink = NewGuid;
      var updateData = new ElementUpdateData { Link = newLink };
      AddUser(userId1);
      AddUser(userId2);
      var collection = AddCollection(userId1, 50);
      ShareCollection(collection.Id, userId2, true);
      Element element = null;
      InTransaction(context =>
      {
        element = context.Element.First();
      });

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new ElementsController(context, GetUserProviderMock(userId2));
        result = controller.UpdateElement(element.Id, updateData);
      });

      //Assert
      result.Should().BeOfType<OkResult>();
    }


    [Fact]
    public void DeleteElement_ElementDoesNotExist_NotFound()
    {
      //Arrange
      var userId = NewGuid;
      var newLink = NewGuid;
      AddUser(userId);
      AddCollection(userId, 1);
      Element element = null;
      InTransaction(context =>
      {
        element = context.Element.First();
      });

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new ElementsController(context, GetUserProviderMock(userId));
        result = controller.DeleteElement(element.Id + 1);
      });

      //Assert
      result.Should().BeOfType<NotFoundResult>();
    }

    [Fact]
    public void DeleteElement_CollectionNotOwnedByUserAndNotShared_Forbidden()
    {
      //Arrange
      var userId1 = NewGuid;
      var userId2 = NewGuid;
      var newLink = NewGuid;
      AddUser(userId1);
      AddUser(userId2);
      AddCollection(userId1, 50);
      Element element = null;
      InTransaction(context =>
      {
        element = context.Element.First();
      });

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new ElementsController(context, GetUserProviderMock(userId2));
        result = controller.DeleteElement(element.Id);
      });

      //Assert
      result.Should().BeOfType<ForbidResult>();
    }

    [Fact]
    public void DeleteElement_CollectionNotOwnedByUserButHasViewRights_Forbidden()
    {
      //Arrange
      var userId1 = NewGuid;
      var userId2 = NewGuid;
      var newLink = NewGuid;
      AddUser(userId1);
      AddUser(userId2);
      var collection = AddCollection(userId1, 50);
      ShareCollection(collection.Id, userId2, false);
      Element element = null;
      InTransaction(context =>
      {
        element = context.Element.First();
      });

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new ElementsController(context, GetUserProviderMock(userId2));
        result = controller.DeleteElement(element.Id);
      });

      //Assert
      result.Should().BeOfType<ForbidResult>();
    }

    [Fact]
    public void DeleteElement_CollectionNotOwnedByUserButHasEditRights_Ok()
    {
      //Arrange
      var userId1 = NewGuid;
      var userId2 = NewGuid;
      var newLink = NewGuid;
      AddUser(userId1);
      AddUser(userId2);
      var collection = AddCollection(userId1, 50);
      ShareCollection(collection.Id, userId2, true);
      Element element = null;
      InTransaction(context =>
      {
        element = context.Element.First();
      });

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new ElementsController(context, GetUserProviderMock(userId2));
        result = controller.DeleteElement(element.Id);
      });

      //Assert
      result.Should().BeOfType<OkResult>();
    }

    [Fact]
    public void DeleteElement_ElementHasSucceedingElements_SequencesAdjusted()
    {
      //Arrange
      var userId1 = NewGuid;
      var userId2 = NewGuid;
      AddUser(userId1);
      AddUser(userId2);
      var collection = AddCollection(userId1, 50);
      ShareCollection(collection.Id, userId2, true);
      Element element = null;
      InTransaction(context =>
      {
        element = context.Element.First();
      });

      //Act
      IActionResult result = null;
      InTransaction(context =>
      {
        var controller = new ElementsController(context, GetUserProviderMock(userId2));
        result = controller.DeleteElement(element.Id);
      });

      //Assert
      InTransaction(context =>
      {
        var collectionFromContext = context.Collection
          .Include(c => c.Elements)
          .Single(c => c.Id == collection.Id);
        var elements = collectionFromContext.Elements.OrderBy(s => s.Sequence);
        var expectedSequence = 0;
        foreach (var element in elements)
        {
          element.Sequence.Should().Be(expectedSequence);
          expectedSequence++;
        }
      });
    }


  }
}
