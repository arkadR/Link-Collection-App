using System;
using System.Collections.Generic;
using System.Text;
using IdentityServer4.EntityFramework.Options;
using LinkCollectionApp.Data;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Moq;

namespace LinkCollectionApp.Test
{
  public abstract class IntegrationTestBase : IDisposable
  {
    private readonly DbContextOptions<ApplicationDbContext> _options;
    private readonly IOptions<OperationalStoreOptions> _operationalStoreOptions;

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
  }
}
