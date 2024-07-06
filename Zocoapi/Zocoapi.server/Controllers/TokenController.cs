using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Product.Server.Models;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Text;

namespace Product.Server.Controllers
{
    [Route("api/token")]
    [ApiController]
    public class TokenController : ControllerBase
    {
        private readonly JwtSettings _jwtSettings;

        public TokenController(IOptions<JwtSettings> jwtSettings)
        {
            _jwtSettings = jwtSettings.Value;
        }

        [HttpGet("validate")]
        public IActionResult ValidateToken()
        {
            // User is authenticated, token is valid
            return Ok(new { Message = "Token is valid." });
        }

        // You can add more endpoints for token operations here as needed
    }
}
