using System;
using api.Models;
namespace api.Models.Dbs {
  public class User {
    public int UserId { get; set; }
    public string UserCode { get; set; }
    public string EMail { get; set; }
    public string Name { get; set; }
    public DateTime BirthDate { get; set; }
    public Gender Gender { get; set; }
    public DateTime UpdatedAt { get; set; }
    public DateTime? DeletedAt { get; set; }
  }
}