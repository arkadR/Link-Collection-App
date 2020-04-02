using System;
using System.Linq;
using FluentAssertions;
using IdentityServer4.EntityFramework.Options;
using LinkCollectionApp.Data;
using LinkCollectionApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Moq;
using Xunit;

namespace LinkCollectionApp.Test
{
  public class ApplicationDbContextTests : IDisposable
  {
    private readonly DbContextOptions<ApplicationDbContext> _options;
    private readonly IOptions<OperationalStoreOptions> _operationalStoreOptions;
    
    public ApplicationDbContextTests()
    {
      var databaseName = Guid.NewGuid().ToString();
      _options = new DbContextOptionsBuilder<ApplicationDbContext>()
        .UseInMemoryDatabase(databaseName)
        .Options;

      var operationalStoreOptionsMock = new Mock<IOptions<OperationalStoreOptions>>();
      operationalStoreOptionsMock.Setup(m => m.Value)
        .Returns(new OperationalStoreOptions());

      _operationalStoreOptions = operationalStoreOptionsMock.Object;
    }

    public void Dispose() { }

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
        Email = $"{userId}@test.com"
      };
      var userWithTheSameId = new ApplicationUser
      {
        Id = userId,
        Email = $"{userId}2@test.com"
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

    private void InTransaction(Action<ApplicationDbContext> action)
    {
      using var context = new ApplicationDbContext(_options, _operationalStoreOptions);
      action(context);
    }

  }
}

