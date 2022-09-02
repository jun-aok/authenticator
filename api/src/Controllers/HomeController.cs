using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using FirebaseAdmin.Auth;
using FirebaseAdmin;
using Microsoft.AspNetCore.Authorization;

namespace api.Controllers
{
    [ApiController]
    [Route("[controller]")]
    [Authorize]
    public class HomeController : ControllerBase
    {
        private readonly ILogger<HomeController> _logger;

        public HomeController(ILogger<HomeController> logger)
        {
          _logger = logger;
        }

        [HttpGet]
        public async Task<IEnumerable<object>> Get()
        {
          return new []{ new { name = HttpContext.User.Identity.Name } };
        }
    }
}
