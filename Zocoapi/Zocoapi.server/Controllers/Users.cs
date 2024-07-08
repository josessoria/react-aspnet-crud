using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Product.Server.Models;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;

namespace Zocoapi.server.Controllers


{


    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly UserContext _context;

        public UsersController(UserContext context)
        {
            _context = context;
        }

        // GET: api/Users
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            var username = User.Identity.Name;

            var user = await _context.User.FirstOrDefaultAsync(u => u.Username == username);

            if (user == null || user.Role != "admin")
            {
                return Forbid(); // O puedes devolver Unauthorized() dependiendo de tu lógica de permisos
            }

            return await _context.User.ToListAsync();
        }

        // GET: api/Users/5
        [HttpGet("{id}")]
        public async Task<ActionResult<User>> GetUser(int id)
        {
            var user = await _context.User.FindAsync(id);

            if (user == null)
            {
                return NotFound();
            }

            return user;
        }

        // POST: api/Users
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            try
            {
                if (!ModelState.IsValid)
                {
                    return BadRequest(ModelState);
                }

                var existingUser = await _context.User.FirstOrDefaultAsync(u => u.Username == user.Username);
                if (existingUser != null)
                {
                    return BadRequest(new { Message = "Username already exists." });
                }

                string hashedPassword = BCrypt.Net.BCrypt.HashPassword(user.PasswordHash); // Encriptar la contraseña

                user.PasswordHash = hashedPassword;

                _context.User.Add(user);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/Users/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            var username = User.Identity.Name;

            var currentUser = await _context.User.FirstOrDefaultAsync(u => u.Username == username);

            if (currentUser == null || currentUser.Role != "admin")
            {
                return Forbid();
            }

            if (id != user.Id)
            {
                return BadRequest();
            }

            try
            {

                _context.Attach(user);

                _context.Entry(user).State = EntityState.Modified;

                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(user);
        }


        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            var username = User.Identity.Name;

            var currentUser = await _context.User.FirstOrDefaultAsync(u => u.Username == username);

            if (currentUser == null || currentUser.Role != "admin")
            {
                return Forbid(); // O puedes devolver Unauthorized() dependiendo de tu lógica de permisos
            }

            var user = await _context.User.FindAsync(id);
            if (user == null)
            {
                return NotFound();
            }

            _context.User.Remove(user);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool UserExists(int id)
        {
            return _context.User.Any(e => e.Id == id);
        }

        [HttpGet("user-role")]
        public IActionResult GetUserRole()
        {
            // Obtiene el claim del rol del usuario
            var roleClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Role);
            if (roleClaim != null)
            {
                string userRole = roleClaim.Value;
                return Ok(new { Role = userRole });
            }

            return Unauthorized("User role not found.");
        }

        // GET: api/Users/current
        [HttpGet("current")]
        public async Task<ActionResult<User>> GetCurrentUser()
        {
            // Obtiene el id del usuario desde el claim del token
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("User not authenticated.");
            }

            var userId = int.Parse(userIdClaim.Value);

            // Busca el usuario en la base de datos por su id
            var user = await _context.User.FindAsync(userId);

            if (user == null)
            {
                return NotFound();
            }

            // Elimina el PasswordHash antes de devolver el usuario
            user.PasswordHash = null;

            return user;
        }

        // PATCH: api/Users/current/role/admin
        [HttpPatch("current/role/admin")]
        [Authorize]
        public async Task<ActionResult<User>> ChangeCurrentUserRoleToAdmin()
        {
            // Obtiene el id del usuario desde el claim del token
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("User not authenticated.");
            }

            var userId = int.Parse(userIdClaim.Value);

            // Busca el usuario en la base de datos por su id
            var user = await _context.User.FindAsync(userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Cambia el rol del usuario a "admin"
            user.Role = "admin";

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(userId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(user); // Devuelve el usuario modificado
        }

        // PATCH: api/Users/current/role/user
        [HttpPatch("current/role/user")]
        [Authorize]
        public async Task<ActionResult<User>> ChangeCurrentUserRoleToUser()
        {
            // Obtiene el id del usuario desde el claim del token
            var userIdClaim = User.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier);
            if (userIdClaim == null)
            {
                return Unauthorized("User not authenticated.");
            }

            var userId = int.Parse(userIdClaim.Value);

            // Busca el usuario en la base de datos por su id
            var user = await _context.User.FindAsync(userId);

            if (user == null)
            {
                return NotFound("User not found.");
            }

            // Cambia el rol del usuario a "user"
            user.Role = "user";

            _context.Entry(user).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!UserExists(userId))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return Ok(user); // Devuelve el usuario modificado
        }


    }
}
