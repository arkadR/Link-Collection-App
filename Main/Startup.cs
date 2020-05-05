using System.Security.Cryptography.X509Certificates;
using System.Text.Json;
using LinkCollectionApp.Data;
using LinkCollectionApp.Infrastructure.Implementations;
using LinkCollectionApp.Infrastructure.Interfaces;
using LinkCollectionApp.Models;
using Microsoft.AspNetCore.ApiAuthorization.IdentityServer;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;

namespace LinkCollectionApp
{
  public class Startup
  {
    public Startup(IConfiguration configuration)
    {
      Configuration = configuration;
    }

    public IConfiguration Configuration { get; }

    public void ConfigureServices(IServiceCollection services)
    {

      services
        .AddControllersWithViews()
        .AddNewtonsoftJson()
        .AddJsonOptions(opts =>
        {
          opts.JsonSerializerOptions.PropertyNameCaseInsensitive = true;
          opts.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;
        });

    services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(
          Configuration.GetConnectionString("ApplicationDbContextConnection")));

      services.AddHttpContextAccessor();
      services.AddTransient<IUserContextProvider, UserContextProvider>();
      ConfigureIdentity(services);

      // In production, the React files will be served from this directory
      services.AddSpaStaticFiles(configuration =>
      {
        configuration.RootPath = "ClientApp/build";
      });
    }

    private void ConfigureIdentity(IServiceCollection services)
    {
      services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
        .AddEntityFrameworkStores<ApplicationDbContext>();

      var cert = new X509Certificate2("cert/IdentityServer4Auth.pfx", "TestPassword");
      
      services.AddIdentityServer()
        .AddSigningCredential(cert)
        .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

      services.AddAuthentication()
        .AddGoogle(options =>
        {
          var googleAuthNSection = Configuration.GetSection("Authentication:Google");
          options.ClientId = googleAuthNSection["ClientId"];
          options.ClientSecret = googleAuthNSection["ClientSecret"];
        })
        .AddIdentityServerJwt();

      services.Configure<JwtBearerOptions>(IdentityServerJwtConstants.IdentityServerJwtBearerScheme, 
        opts => opts.TokenValidationParameters.ValidateIssuer = false);
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment() || env.IsStaging())
      {
        app.UseDeveloperExceptionPage();
      }
      else
      {
        app.UseExceptionHandler("/Error");
        app.UseHsts();
      }

      app.UseHttpsRedirection();
      app.UseStaticFiles();

      app.UseRouting();

      app.UseAuthentication();
      app.UseIdentityServer();
      app.UseAuthorization();

      app.UseEndpoints(endpoints =>
      {
        endpoints.MapControllerRoute(
                  name: "default",
                  pattern: "{controller}/{action=Index}/{id?}");
        endpoints.MapRazorPages();
      });

      ConfigureSpa(app, env);
    }

    private void ConfigureSpa(IApplicationBuilder app, IHostEnvironment env)
    {
      app.UseSpaStaticFiles();

      app.UseSpa(spa =>
      {
        spa.Options.SourcePath = "ClientApp";
        if (env.IsDevelopment())
        {
          spa.UseReactDevelopmentServer(npmScript: "start");
        }
      });
    }
  }
}
