using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Models.Dbs;

namespace api.Models.Repositories {
  public interface IUserRepository {
    Task<User> GetUser(string userCode);
    Task<bool> UpdateUser(string userCode, User user);
    Task<bool> InsertUser(User user);
  }
}