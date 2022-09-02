using Dapper;
using System;
using System.Threading.Tasks;
using api.Models.Dbs;
using MySql.Data.MySqlClient;

namespace api.Models.Repositories {
  public class UserRepository : IUserRepository {
    public async Task<User> GetUser(string userCode) {
      var db = @"Server=127.0.0.1;User Id=jun;Password=jun;Database=react_auth_4";
      using (var connection = new MySqlConnection(db)) {
        var sql = @"
SELECT
  user_id UserId,
  user_code UserCode,
  name Name,
  birth_date BirthDate,
  gender Gender,
  created_at CreatedAt,
  updated_at UpdatedAt
FROM user 
WHERE user_code = @userCode AND deleted_at IS NOT NULL";
        return await connection.QueryFirstOrDefaultAsync<User>(sql, new { userCode });
      }
    }

    public Task<bool> UpdateUser(string userCode, User user) {
      throw new NotImplementedException();
    }

    public async Task<bool> InsertUser(User user) {
      var db = @"Server=127.0.0.1;User Id=jun;Password=jun;Database=react_auth_4";
      using (var connection = new MySqlConnection(db)) {
        var sql = @"
INSERT INTO user(user_code, name, birth_date, gender, created_at, updated_at)
VALUES(@user_code, @name, @birth_date, @gender, @created_at, @updated_at)";
        return (await connection.ExecuteAsync(
          sql
          , new {
            user_code = user.UserCode
            , name = user.Name
            , birth_date = user.BirthDate
            , gender = (int)user.Gender
            , created_at = DateTime.Now
            , updated_at = DateTime.Now
          }
        )) == 1;
      }
    }
  }
}