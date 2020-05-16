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
  public abstract class UnitTestBase : IDisposable
  {
    private readonly DbContextOptions<ApplicationDbContext> _options;
    private readonly IOptions<OperationalStoreOptions> _operationalStoreOptions;

    protected string NewGuid => Guid.NewGuid().ToString();

    protected UnitTestBase()
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

    protected Collection AddCollection(string ownerId, int numOfElements, string name = null, string description = null)
    {
      var collection = new Collection
      {
        OwnerId = ownerId,
        Description = description ?? NewGuid,
        Name = name ?? NewGuid,
        IsPublic = false,
        Elements = Enumerable.Range(0, numOfElements).Select(num => new Element
        {
          Name = NewGuid,
          Link = NewGuid,
          Sequence = num
        }).ToList()
      };
      InTransaction(context =>
      {
        context.Add(collection);
        context.SaveChanges();
      });
      return collection;
    }

    protected SharedCollection ShareCollection(int collectionId, string userId, bool editRights)
    {
      var sharedCollection = new SharedCollection
      {
        CollectionId = collectionId,
        UserId = userId,
        EditRights = editRights
      };
      InTransaction(context =>
      {
        context.SharedCollection.Add(sharedCollection);
        context.SaveChanges();
      });
      return sharedCollection;
    }

    protected SavedCollection SaveCollection(int collectionId, string userId)
    {
      var savedCollection = new SavedCollection
      {
        CollectionId = collectionId,
        UserId = userId
      };
      InTransaction(context =>
      {
        context.SavedCollection.Add(savedCollection);
        context.SaveChanges();
      });
      return savedCollection;
    }

    protected IUserContextProvider GetUserProviderMock(string userId)
    {
      var userProviderMock = new Mock<IUserContextProvider>();
      userProviderMock.Setup(m => m.GetCurrentUserId()).Returns(userId);
      return userProviderMock.Object;
    }

    protected ICollectionConfigurationProvider getCollectionConfigurationProviderMock(
      int maxCollectionsPerUser = int.MaxValue, 
      int maxElementsInCollection = int.MaxValue)
    {
      var mock = new Mock<ICollectionConfigurationProvider>();
      mock.Setup(m => m.MaxCollectionsPerUser).Returns(maxCollectionsPerUser);
      mock.Setup(m => m.MaxElementsInCollection).Returns(maxElementsInCollection);
      return mock.Object;
    }
  }
}
