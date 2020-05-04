using System.Linq;
using System.Net;
using FluentAssertions;
using LinkCollectionApp.Controllers;
using LinkCollectionApp.Models;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace LinkCollectionApp.Test
{
  public class PublicCollectionsControllerTests : IntegrationTestBase
  {
    [Fact]
    public void GetPublicCollection_CollectionPublic_Ok()
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
      ActionResult<Collection> result = null;
      InTransaction(context =>
      {
        var controller = new PublicCollectionsController(context);
        result = controller.GetPublicCollection(collection.Id);
      });

      //Assert 
      result.Value.Should().NotBeNull();
      result.Value.Id.Should().Be(collection.Id);
    }

    [Fact]
    public void GetPublicCollection_CollectionPrivate_NotFound()
    {
      //Arrange
      var userId1 = NewGuid;
      AddUser(userId1);
      var collection = AddCollection(userId1, 5);

      //Act
      ActionResult<Collection> result = null;
      InTransaction(context =>
      {
        var controller = new PublicCollectionsController(context);
        result = controller.GetPublicCollection(collection.Id);
      });

      //Assert 
      (result.Result as StatusCodeResult).StatusCode.Should().Be((int)HttpStatusCode.NotFound);
    }

    [Fact]
    public void GetPublicCollection_CollectionDoesNotExist_NotFound()
    {
      //Arrange
      var userId1 = NewGuid;
      AddUser(userId1);

      //Act
      ActionResult<Collection> result = null;
      InTransaction(context =>
      {
        var controller = new PublicCollectionsController(context);
        result = controller.GetPublicCollection(1010);
      });

      //Assert 
      (result.Result as StatusCodeResult).StatusCode.Should().Be((int)HttpStatusCode.NotFound);
    }
  }
}
