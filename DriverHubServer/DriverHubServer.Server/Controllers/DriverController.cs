using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using DriverHubServer.Data;
using DriverHubDatabase.Context;
using DriverHubDatabase.Entities;
using Microsoft.AspNetCore.Authorization;

namespace Driver.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DriverController(DriverHubDatabaseContext context) : ControllerBase
    {
        private readonly DriverHubDatabaseContext _context = context;

        // GET: api/Drivers
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Drivers>>> GetCountries()
        {
            return await _context.Drivers.ToListAsync();
        }

        // GET: api/Countries/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Drivers>> GetDriver(int id)
        {
            var drivers = await _context.Drivers.FindAsync(id);

            if (drivers == null)
            {
                return NotFound();
            }

            return drivers;
        }

        // GET: api/DriverDetails/5
        [HttpGet("driver-details/{id}")]
        [Authorize]
        public async Task<ActionResult<Drivers>> GetCountryPopulation(int id)
        {
            Drivers? driver = await _context.Drivers.FindAsync(id);

            if (driver == null)
            {
                return NotFound();
            }



            int raceResults = await _context.RaceResults.Where(x => x.DriverId == id).Select(x => x.Result).SumAsync();

            DriverDetails driverdetials = new()
            {
                Id = driver.Id,
                Name = driver.Name,
                Population = raceResults
            };

            return countrypopulation;
        }

        // PUT: api/Countries/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutCountry(int id, Country country)
        {
            if (id != country.Id)
            {
                return BadRequest();
            }

            _context.Entry(country).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!CountryExists(id))
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

        // POST: api/Countries
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Country>> PostCountry(Country country)
        {
            _context.Countries.Add(country);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetCountry", new { id = country.Id }, country);
        }

        // DELETE: api/Countries/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteCountry(int id)
        {
            var country = await _context.Countries.FindAsync(id);
            if (country == null)
            {
                return NotFound();
            }

            _context.Countries.Remove(country);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool CountryExists(int id)
        {
            return _context.Countries.Any(e => e.Id == id);
        }
    }
}