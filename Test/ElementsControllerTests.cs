using System.Linq;
using FluentAssertions;
using LinkCollectionApp.Controllers;
using LinkCollectionApp.Models.DTO;
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
  }
}
