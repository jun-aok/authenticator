using System;
using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Authentication;
using System.Threading.Tasks;
using Microsoft.Extensions.Logging;
using System.Text.Encodings.Web;
using Microsoft.Extensions.Options;
using System.Security.Claims;
using FirebaseAdmin.Auth;
using FirebaseAdmin;

namespace api.Models {
  class FirebaseAuthencticationHandler : AuthenticationHandler<AuthenticationSchemeOptions> {
    public FirebaseAuthencticationHandler(
      IOptionsMonitor<AuthenticationSchemeOptions> options, 
      ILoggerFactory logger, 
      UrlEncoder encoder, 
      ISystemClock clock
    ) : base(options, logger, encoder, clock) {
    }
    protected async override Task<AuthenticateResult> HandleAuthenticateAsync() {
      Request.Headers.TryGetValue("Authorization", out var bearer);
      
      if(string.IsNullOrEmpty(bearer.ToString())) {
        return await Task.FromResult(AuthenticateResult.Fail(""));
      }
      var bearers = bearer.ToString().Split(" ");
      if(bearers.FirstOrDefault() != "Bearer") {
        return await Task.FromResult(AuthenticateResult.Fail(""));
      }
      var email = await AuthrizeToken(bearers.Last());
      if(email == null) {
        return await Task.FromResult(AuthenticateResult.Fail(""));
      }
      return await Task.FromResult(
        AuthenticateResult.Success(
          new AuthenticationTicket(
            new ClaimsPrincipal(
              new ClaimsIdentity(
                new[] {
                  new Claim(ClaimTypes.Name, email),
                } , "FirebaseAuthType"
              )
            ), "Api"
          )
        )
      );
    }

    private async Task<string> AuthrizeToken(string token) {
      try {
        return (await FirebaseAuth.DefaultInstance.VerifyIdTokenAsync(token)).Uid;
      } catch {
        return null;
      }
    }
  }
}