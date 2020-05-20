// using System;
// using System.IO;
// using System.Linq;
// using System.Net;
// using System.Threading.Tasks;
// using FluentAssertions;
// using IdentityServer4.Models;
// using LinkCollectionApp.Data;
// using LinkCollectionApp.Models;
// using Microsoft.AspNetCore.Hosting;
// using Microsoft.AspNetCore.Mvc.Testing;
// using Microsoft.AspNetCore.TestHost;
// using Microsoft.EntityFrameworkCore;
// using Microsoft.Extensions.Configuration;
// using Microsoft.Extensions.DependencyInjection;
// using Microsoft.Extensions.Hosting;
// using Microsoft.Extensions.Logging;
// using Xunit;
//
// namespace LinkCollectionApp.Test.IntegrationTests
// {
//   public class AuthenticationTests : IClassFixture<CustomWebApplicationFactory<TestStartup>>
//   {
//     private readonly WebApplicationFactory<TestStartup> _factory;
//
//     public AuthenticationTests(CustomWebApplicationFactory<TestStartup> factory)
//     {
//       var projectDir = Directory.GetCurrentDirectory();
//       var configPath = Path.Combine(projectDir, "appsettings.json");
//
//       _factory = factory.WithWebHostBuilder(builder =>
//       {
//         builder.UseSolutionRelativeContentRoot("Main");
//
//         builder.ConfigureAppConfiguration(conf =>
//         {
//           conf.AddJsonFile(configPath);
//         });
//
//         builder.ConfigureTestServices(services =>
//         {
//           services.AddMvc().AddApplicationPart(typeof(Startup).Assembly);
//         });
//       });
//     }
//
//
//     [Theory]
//     [InlineData("/api/collections")]
//     [InlineData("/api/sharedCollections")]
//     [InlineData("/api/sharedCollections/contributors")]
//     [InlineData("/api/configuration")]
//     [InlineData("/api/users")]
//     [InlineData("/api/users/me")]
//     public async Task Get_EndpointsSecuredWithAuthorization_Unauthorized(string url)
//     {
//       // Arrange
//       var client = _factory.CreateClient();
//
//       // Act
//       var response = await client.GetAsync(url);
//
//       // Assert
//       response.StatusCode.Should().Be(HttpStatusCode.Unauthorized);
//     }
//   }
//
//   public class TestStartup : Startup
//   {
//     public TestStartup(IConfiguration configuration) : base(configuration) { }
//
//     protected override void ConfigureAuthentication(IServiceCollection services)
//     {
//     services.AddAuthentication();
//     }
//
//     protected override void ConfigureIdentity(IServiceCollection services)
//     {
//       services.AddIdentityServer()
//         .AddInMemoryPersistedGrants()
//         .AddInMemoryClients(new [] {new Client()})
//         .AddInMemoryIdentityResources(new [] {new IdentityResource() })
//         .AddInMemoryApiResources( new []{ new ApiResource("api")});
//     }
//   }
//
//   public class CustomWebApplicationFactory<TStartup>
//     : WebApplicationFactory<TStartup> where TStartup : class
//   {
//     protected override IHostBuilder CreateHostBuilder()
//     {
//       // return base.CreateHostBuilder();
//       var builder = Host.CreateDefaultBuilder()
//         .ConfigureWebHostDefaults(x =>
//         {
//           x.UseStartup<TestStartup>().UseTestServer();
//         })
//         .ConfigureAppConfiguration((hostingContext, config) =>
//           {
//             config.AddJsonFile("appsettings.json", optional: false, reloadOnChange: false);
//           });
//       return builder;
//     }
//
//     protected override void ConfigureWebHost(IWebHostBuilder builder)
//     {
//       builder.ConfigureServices(services =>
//       {
//         var descriptor = services.SingleOrDefault(
//           d => d.ServiceType == typeof(DbContextOptions<ApplicationDbContext>));
//
//         if (descriptor != null)
//           services.Remove(descriptor);
//
//         services.AddDbContext<ApplicationDbContext>(options =>
//         {
//           options.UseInMemoryDatabase("InMemoryDbForTesting");
//         });
//
//         var sp = services.BuildServiceProvider();
//
//         using var scope = sp.CreateScope();
//         var scopedServices = scope.ServiceProvider;
//         var db = scopedServices.GetRequiredService<ApplicationDbContext>();
//         var logger = scopedServices
//           .GetRequiredService<ILogger<CustomWebApplicationFactory<TStartup>>>();
//
//         db.Database.EnsureCreated();
//
//         try
//         {
//           SeedDatabase(db);
//         }
//         catch (Exception ex)
//         {
//           logger.LogError(ex, $"An error occurred seeding the database with test messages. Error: {ex.Message}");
//         }
//       });
//     }
//
//     private void SeedDatabase(ApplicationDbContext context)
//     {
//       context.Collection.Add(new Collection
//       {
//         Id = 1,
//         IsPublic = true
//       });
//       context.SaveChanges();
//     }
//   }
// }
