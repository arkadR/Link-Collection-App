using System;
using System.Linq;
using FluentAssertions;
using LinkCollectionApp.Models;
using Xunit;

namespace LinkCollectionApp.Test
{
  public class ApplicationDbContextTests : IntegrationTestBase
  {
    [Theory]
    [InlineData("SomeId1")]
    [InlineData("_")]
    [InlineData("1234")]
    public void Add_NewUserId_UserAddedToDatabase(string userId)
    {
      //Arrange
      var user = new ApplicationUser
      {
        Id = userId,
        Email = $"{userId}@test.com"
      };
      
      //Act
      InTransaction(context =>
      {
        context.Add(user);
        context.SaveChanges();
      });

      //Assert
      InTransaction(context =>
      {
        context.Users.Should().NotBeNull();
        context.Users.Should().HaveCount(1);
        context.Users.Single().Id.Should().Be(userId);
      });
    }

    [Theory]
    [InlineData("SomeId1")]
    [InlineData("_")]
    [InlineData("1234")]
    public void Add_ExistingUserId_NotAdded(string userId)
    {
      //Arrange
      var user = new ApplicationUser
      {
        Id = userId,
        Email = Guid.NewGuid().ToString()
      };
      var userWithTheSameId = new ApplicationUser
      {
        Id = userId,
        Email = Guid.NewGuid().ToString()
      };

      //Act
      InTransaction(context =>
      {
        context.Add(user);
        context.SaveChanges();
      });

      //Assert
      InTransaction(context =>
      {
        Action action = () =>
        {
          context.Add(userWithTheSameId);
          context.SaveChanges();
        };
        action.Should().Throw<ArgumentException>();
      });
    }
  }
}

