using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Bookstore.Models;

namespace Bookstore.Controllers
{
    [Route("[controller]")]
    [ApiController]
    public class CostumersController : ControllerBase
    {
        private readonly BookstoreContext _context;

        public CostumersController(BookstoreContext context)
        {
            _context = context;
        }

        // GET: api/Costumers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Costumers>>> GetCostumers()
        {
            return await _context.Costumers.ToListAsync();
        }

        // GET: api/Costumers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Costumers>> GetCostumers(int id)
        {
            var costumers = await _context.Costumers.FindAsync(id);

            if (costumers == null)
            {
                return NotFound();
            }

            return costumers;
        }

        // PUT: api/Costumers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCostumers(int id, Costumers costumers)
        {
            if (id != costumers.ID)
            {
                return BadRequest();
            }

            _context.Entry(costumers).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CostumersExists(id))
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

        // POST: api/Costumers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Costumers>> PostCostumers(Costumers costumers)
        {
            _context.Costumers.Add(costumers);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCostumers", new { id = costumers.ID }, costumers);
        }

        // DELETE: api/Costumers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCostumers(int id)
        {
            var costumers = await _context.Costumers.FindAsync(id);
            if (costumers == null)
            {
                return NotFound();
            }

            _context.Costumers.Remove(costumers);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CostumersExists(int id)
        {
            return _context.Costumers.Any(e => e.ID == id);
        }
    }
}
