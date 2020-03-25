using LinkCollectionApp.Data;
using LinkCollectionApp.Models;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
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
      ConfigureAuthentication(services);

      services
          .AddControllersWithViews()
          .AddNewtonsoftJson();

      services.AddDbContext<ApplicationDbContext>(options =>
        options.UseSqlServer(
          Configuration.GetConnectionString("ApplicationDbContextConnection")));


      services.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true)
        .AddEntityFrameworkStores<ApplicationDbContext>();

      services.AddIdentityServer()
        .AddApiAuthorization<ApplicationUser, ApplicationDbContext>();

      services.AddAuthentication()
        .AddIdentityServerJwt();

      // In production, the React files will be served from this directory
      services.AddSpaStaticFiles(configuration =>
    {
      configuration.RootPath = "ClientApp/build";
    });
    }

    public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
    {
      if (env.IsDevelopment())
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

    private void ConfigureAuthentication(IServiceCollection services)
    {
      //services
      //.AddDefaultIdentity<ApplicationUser>(options => options.SignIn.RequireConfirmedAccount = true);
      //.AddEntityFrameworkStores<ApplicationDbContext>();
    }

    private void ConfigureSpa(IApplicationBuilder app, IWebHostEnvironment env)
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
