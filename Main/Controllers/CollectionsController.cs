using System;
using System.Collections.Generic;
using LinkCollectionApp.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace LinkCollectionApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CollectionsController : ControllerBase
    {
        [Authorize]
        [HttpGet]
        public ICollection<Collection> GetUserCollections()
        {
            return new List<Collection>()
              {
                new Collection
                {
                  CreatedDate = DateTime.Today,
                  Description = "fbkwfbhk",
                  Element = new List<Element>(),
                  Id = 1,
                  IsPublic = false,
                  Name = "Collection1",
                  OwnerId = User.Identity.Name
                }
              };
        }
    }
}