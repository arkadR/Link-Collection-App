using System;
using System.Collections.Generic;
using System.Linq;
using LinkCollectionApp.Data;
using LinkCollectionApp.Infrastructure.Interfaces;
using LinkCollectionApp.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace LinkCollectionApp.Controllers
{
  [Authorize]
  [Route("api/[controller]")]
  [ApiController]
  public class UsersController : ControllerBase
  {
    private readonly ApplicationDbContext _dbContext;
    private readonly IUserContextProvider _userContextProvider;

    public UsersController(IUserContextProvider userContextProvider, ApplicationDbContext dbContext)
    {
      _userContextProvider = userContextProvider;
      _dbContext = dbContext;
    }

    [HttpGet]
    public List<UserSimpleData> GetFriends()
    {
      var userId = _userContextProvider.GetCurrentUserId();
      var users = _dbContext.ApplicationUser.Where(user => user.Id != userId);
      return users.Select(user => UserSimpleData.Create(user)).ToList();
    }
  }
}
