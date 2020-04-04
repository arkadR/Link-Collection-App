using System;
using System.Linq;
using IdentityServer4.EntityFramework.Options;
using LinkCollectionApp.Data;
using LinkCollectionApp.Infrastructure.Interfaces;
using LinkCollectionApp.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Moq;

namespace LinkCollectionApp.Test
{
  public abstract class IntegrationTestBase : IDisposable
  {
    private readonly DbContextOptions<ApplicationDbContext> _options;
    private readonly IOptions<OperationalStoreOptions> _operationalStoreOptions;

    protected string NewGuid => Guid.NewGuid().ToString();

    protected IntegrationTestBase()
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

    protected void InTransaction(Action<ApplicationDbContext> action)
    {
      using var context = new ApplicationDbContext(_options, _operationalStoreOptions);
      action(context);
    }


    protected void AddUser(string userId)
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

    protected Collection AddCollection(string ownerId, int numOfElements)
    {
      var collection = new Collection
      {
        OwnerId = ownerId,
        Description = Guid.NewGuid().ToString(),
        Elements = Enumerable.Range(0, numOfElements).Select(num => new Element
        {
          Name = Guid.NewGuid().ToString()
        }).ToList()
      };
      InTransaction(context =>
      {
        context.Add(collection);
        context.SaveChanges();
      });
      return collection;
    }

    protected IUserContextProvider GetUserProviderMock(string userId)
    {
      var userProviderMock = new Mock<IUserContextProvider>();
      userProviderMock.Setup(m => m.GetCurrentUserId()).Returns(userId);
      return userProviderMock.Object;
    }
  }
}
