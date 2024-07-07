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
        [Authorize(Policy = "AdminOnly")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<User>>> GetUsers()
        {
            return await _context.User.ToListAsync();
        }

        // GET: api/Users/5
        [Authorize(Policy = "AdminOnly")]
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
        [Authorize(Policy = "AdminOnly")]
        [HttpPost]
        public async Task<ActionResult<User>> PostUser(User user)
        {
            _context.User.Add(user);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetUser), new { id = user.Id }, user);
        }

        // PUT: api/Users/5
        [Authorize(Policy = "AdminOnly")]
        [HttpPut("{id}")]
        public async Task<IActionResult> PutUser(int id, User user)
        {
            if (id != user.Id)
            {
                return BadRequest();
            }

            _context.Entry(user).State = EntityState.Modified;

            try
            {
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

            return NoContent();
        }

        [HttpGet("user-role")]
        [Authorize(Policy = "AdminOnly")]
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

        // DELETE: api/Users/5
        [HttpDelete("{id}")]
        [Authorize(Policy = "AdminOnly")]
        public async Task<IActionResult> DeleteUser(int id)
        {
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
