using Mouse.NET.Auth.Models;

namespace Mouse.Stick.Controllers.Auth
{
    using System.Threading.Tasks;
    using Microsoft.AspNetCore.Authorization;
    using Microsoft.AspNetCore.Mvc;
    using Mouse.NET.Common;

    [ApiController]
    [Route("auth")]
    public class AuthController : ControllerBase
    {
        private IAuthService authService;
        
        public AuthController(IAuthService authService) {
            this.authService = authService;
        }

        [HttpPost("register")]
        public async Task<Account> RegisterAccount ([FromBody] RegisterAccountRequest registerAccountRequest)
        {
            return await this.authService.RegisterAccount(registerAccountRequest, true);
        }

        [HttpPost("login")]
        public async Task<Account> LoginAccount([FromBody] LoginAccountRequest loginAccountRequest)
        {
            return await this.authService.LoginAccount(loginAccountRequest);
        }

        [HttpPost("admin-login")]
        public async Task<Account> AdminLoginAccount([FromBody] LoginAccountRequest loginAccountRequest)
        {
            return await this.authService.AdminLoginAccount(loginAccountRequest);
        }
        
        [HttpPost("change-password")]
        [Authorize(Policy = "AnyAuthenticated")]
        public async Task ChangePassword([FromBody] ChangePasswordAccountRequest changePasswordAccountRequest)
        {
            await this.authService.ChangePassword(changePasswordAccountRequest);
        }
            
    }
}
