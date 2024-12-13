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
using DriverHubServer.DTO;

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
        public async Task<ActionResult<IEnumerable<Drivers>>> GetDrivers()
        {
            if (_context.Drivers == null)
            {
                return NotFound();
            }
            return await _context.Drivers.ToListAsync();
        }

        // GET: api/Drivers/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Drivers>> GetDriver(int id)
        {
            if (_context.Drivers == null)
            {
                return NotFound();
            }
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
        public async Task<ActionResult<DriverDetails>> GetDriverDetails(int id)
        {
            if (_context.Drivers == null)
            {
                return NotFound();
            }
            Drivers? driver = await _context.Drivers.FindAsync(id);

            if (driver == null)
            {
                return NotFound();
            }

            int raceResults = 0;
            if (_context.RaceResults != null)
            {
                raceResults = (int)(await _context.RaceResults.Where(x => x.DriverID == id).Select(x => x.RacePoints).SumAsync() ?? 0);
            }

            DriverDetails driverdetails = new()
            {
                Id = driver.DriverId,
                Abbreviation = driver.Abbreviation ?? string.Empty,
                DriverName = driver.DriverName ?? string.Empty,
                DriverNumber = driver.DriverNumber ?? 0,
                Team = driver.DriverTeam ?? string.Empty,
                Podiums = driver.DriverPodiums ?? 0,
                Points = (int)(driver.DriverPoints ?? 0),
                GrandPrixEntered = driver.DriverGPEntered ?? 0,
                WorldChampionships = driver.DriverChampionships ?? 0,
                HighestRaceFinish = driver.DriverHIRaceFinish ?? 0,
                HighestGridPosition = driver.DriverHIGridPos ?? 0,
                DateOfBirth = driver.DateOfBirth?.ToString("yyyy-MM-dd") ?? string.Empty,
                PlaceOfBirth = driver.PlaceOfBirth ?? string.Empty,
                SeasonYear = driver.SeasonYear?.Year ?? 0
            };

            return driverdetails;
        }

        // PUT: api/Drivers/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDriver(int id, Drivers driver)
        {
            if (id != driver.DriverId)
            {
                return BadRequest();
            }

            _context.Entry(driver).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DriverExists(id))
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

        // POST: api/Drivers
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<Drivers>> PostDriver(Drivers driver)
        {
            if (_context.Drivers == null)
            {
                return Problem("Entity set 'DriverHubDatabaseContext.Drivers'  is null.");
            }
            _context.Drivers.Add(driver);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDriver", new { id = driver.DriverId }, driver);
        }

        // DELETE: api/Drivers/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDrivers(int id)
        {
            if (_context.Drivers == null)
            {
                return NotFound();
            }

            var driver = await _context.Drivers.FindAsync(id);
            if (driver == null)
            {
                return NotFound();
            }

            _context.Drivers.Remove(driver);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool DriverExists(int id)
        {
            return _context.Drivers != null && _context.Drivers.Any(e => e.DriverId == id);
        }
    }
}