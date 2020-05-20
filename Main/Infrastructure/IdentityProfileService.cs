using System;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityServer4;
using IdentityServer4.Extensions;
using IdentityServer4.Models;
using IdentityServer4.Services;
using LinkCollectionApp.Models;
using Microsoft.AspNetCore.Identity;
using Newtonsoft.Json;

namespace LinkCollectionApp.Infrastructure
{
  public class IdentityProfileService : IProfileService
  {

    private readonly IUserClaimsPrincipalFactory<ApplicationUser> _claimsFactory;
    private readonly UserManager<ApplicationUser> _userManager;

    public IdentityProfileService(IUserClaimsPrincipalFactory<ApplicationUser> claimsFactory, UserManager<ApplicationUser> userManager)
    {
      _claimsFactory = claimsFactory;
      _userManager = userManager;
    }

    public async Task GetProfileDataAsync(ProfileDataRequestContext context)
    {
      var sub = context.Subject.GetSubjectId();
      var user = await _userManager.FindByIdAsync(sub);
      if (user == null)
      {
        throw new ArgumentException("");
      }

      var principal = await _claimsFactory.CreateAsync(user);
      var claims = principal.Claims.ToList();

      var roles = await _userManager.GetRolesAsync(user);

      claims.Add(new Claim(
        "roles", 
        JsonConvert.SerializeObject(roles), 
        IdentityServerConstants.ClaimValueTypes.Json));

      context.IssuedClaims = claims;
    }

    public async Task IsActiveAsync(IsActiveContext context)
    {
      var sub = context.Subject.GetSubjectId();
      var user = await _userManager.FindByIdAsync(sub);
      context.IsActive = user != null;
    }
  }
}
