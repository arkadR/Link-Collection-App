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
  public class UnitTest1
  {
    [Fact]
    public void Add_NewUser_UserAddedToDatabase()
    {
      var options = new DbContextOptionsBuilder<ApplicationDbContext>()
        .UseInMemoryDatabase(databaseName: nameof(Add_NewUser_UserAddedToDatabase))
        .Options;

      var operationalStoreOptionsMock = new Mock<IOptions<OperationalStoreOptions>>();
      operationalStoreOptionsMock.Setup(m => m.Value)
        .Returns(new OperationalStoreOptions());

      var userId = new Guid().ToString();
      using (var context = new ApplicationDbContext(options, operationalStoreOptionsMock.Object))
      {
        var user = new ApplicationUser
        {
          Id = userId,
          Email = "test@test.com"
        };
        context.Add(user);
        context.SaveChanges();
      }

      using (var context = new ApplicationDbContext(options, operationalStoreOptionsMock.Object))
      {
        context.Users.Should().NotBeNull();
        context.Users.Should().HaveCount(1);
        context.Users.Single().Id.Should().Be(userId);
      }
    }
  }
}

