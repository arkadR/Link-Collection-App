using System.Linq;
using System.Net;
using System.Threading.Tasks;
using FluentAssertions;
using LinkCollectionApp.Controllers;
using LinkCollectionApp.Infrastructure.DTO;
using LinkCollectionApp.Infrastructure.Interfaces;
using LinkCollectionApp.Models;
using Microsoft.AspNetCore.Mvc;
using Moq;
using UAParser;
using Xunit;

namespace LinkCollectionApp.Test.UnitTests
{
  public class PublicCollectionsControllerTests : UnitTestBase
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
        var controller = new PublicCollectionsController(context, GetRequestInfoServiceMock(), GetUserProviderMock(""));
        result = controller.GetPublicCollection(collection.Id).Result;
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
        var controller = new PublicCollectionsController(context, GetRequestInfoServiceMock(), GetUserProviderMock(""));
        result = controller.GetPublicCollection(collection.Id).Result;
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
        var controller = new PublicCollectionsController(context, GetRequestInfoServiceMock(), GetUserProviderMock(""));
        result = controller.GetPublicCollection(1010).Result;
      });

      //Assert 
      (result.Result as StatusCodeResult).StatusCode.Should().Be((int)HttpStatusCode.NotFound);
    }

    private IRequestInfoService GetRequestInfoServiceMock()
    {
      var mock = new Mock<IRequestInfoService>();
      mock.Setup(m => m.GetFromCurrentRequest()).Returns(
        Task.FromResult(new RequestInfo
        {
          ClientInfo = new ClientInfo("TestClientInfo",
            new OS("TestOSFamily", "1", "0", "0", "0"),
            new Device("TestDeviceFamily", "TestBrand", "TestModel"),
            new UserAgent("TestUAFamily", "1", "0", "0")),
          IpInfo = new IpInfo { Country = "TestCountry" }
        }));
      return mock.Object;
    }
  }
}
