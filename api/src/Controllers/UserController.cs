using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using Microsoft.AspNetCore.Authorization;
using api.Models.Repositories;
using api.Models.Dbs;
using api.Models;

namespace api.Controllers {
  [ApiController]
  [Route("api/user")]
  [Authorize]
  public class UserController : ControllerBase {
    private readonly ILogger<HomeController> _logger;
    private readonly IUserRepository _repository;

    public UserController(ILogger<HomeController> logger, IUserRepository repository) {
      _logger = logger;
      _repository = repository;
    }

    [HttpGet]
    public async Task<ResponseBase<User>> Get() {
      var uid = HttpContext.User.Identity.Name;
      return new ResponseBase<User>(await _repository.GetUser(uid));
    }

    [HttpPost]
    public async Task<ResponseBase<bool>> Post([FromBody]UserPostRequestModel requestModel) {
      if(!ModelState.IsValid) {
        return null;
      }
      var insertResult = await _repository.InsertUser(
        new User() {
          UserCode = HttpContext.User.Identity.Name,
          EMail = requestModel.EMail,
          Name = requestModel.Name,
          BirthDate = requestModel.BirthDate,
          Gender = requestModel.Gender,
        }
      );
      return new ResponseBase<bool>(insertResult);
    }

    [HttpPut]
    public async Task<ResponseBase<bool>> Put([FromQuery]UserPutRequestModel requestModel) {
      if(!ModelState.IsValid) {
        return null;
      }
      var updateResult = await _repository.UpdateUser(
        HttpContext.User.Identity.Name,
        new User() {
          EMail = requestModel.EMail,
          Name = requestModel.Name,
          Gender = requestModel.Gender,
          UpdatedAt = DateTime.Now,
        }
      );
      return new ResponseBase<bool>(updateResult);
    }
  }

  public class UserPostRequestModel {
    public string EMail { get; set; }
    public string Name { get; set; }
    [Range((int)Gender.Male, (int)Gender.NoAnswer)]
    public Gender Gender { get; set; }
    public DateTime BirthDate { get; set; }
  }

  public class UserPutRequestModel {
    public string EMail { get; set; }
    public string Name { get; set; }
    [Range((int)Gender.Male, (int)Gender.NoAnswer)]
    public Gender Gender { get; set; }
  }
}
