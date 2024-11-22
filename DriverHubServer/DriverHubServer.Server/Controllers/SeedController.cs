using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using System;
using DriverHubDatabase;
using DriverHubServer.Data;
using DriverHubDatabase.Context;
using DriverHubDatabase.Entities;
using CsvHelper.Configuration;
using System.Globalization;
using CsvHelper;
using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.CodeAnalysis.CSharp.Syntax;
using System.Drawing.Printing;

namespace DriverHubServer.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SeedController(DriverHubDatabaseContext context, IHostEnvironment environment, UserManager<AppUser> userManager) : ControllerBase
    {
        private readonly string _pathName = Path.Combine(environment.ContentRootPath, "Data/Driver's Information/formula1_drivers.csv");

        [HttpPost("Drivers")]
        public async Task<IActionResult> ImportDriversAsync()
        {
            Dictionary<string, Drivers> driversByName = context.Drivers?
            .AsNoTracking().Where(x => x.DriverName != null).ToDictionary(x => x.DriverName!, StringComparer.OrdinalIgnoreCase)
            ?? new Dictionary<string, Drivers>(StringComparer.OrdinalIgnoreCase);

            CsvConfiguration config = new(CultureInfo.InvariantCulture)
            {
                HasHeaderRecord = true,
                HeaderValidated = null
            };
            using StreamReader reader = new(_pathName);
            using CsvReader csv = new(reader, config);

            List<DriversCSV> records = csv.GetRecords<DriversCSV>().ToList();
            foreach (DriversCSV record in records)
            {
                if (driversByName.ContainsKey(record.Driver))
                {
                    continue;
                }

                Drivers driver = new()
                {
                    DriverName = record.Driver,
                    Abbreviation = record.Abbreviation,
                    DriverNumber = record.Number,
                    DriverTeam = record.Team,
                    DriverCountry = record.Country,
                    DriverPodiums = record.Podiums,
                    DriverPoints = record.Points,
                    DriverGPEntered = record.GpEntered,
                    DriverChampionships = record.WorldChampionships,
                    DriverHIRaceFinish = record.HiRaceFinish,
                    DriverHIGridPos = record.HiGridPosition,
                    DateOfBirth = record.DateOfBirth,
                    PlaceOfBirth = record.PlaceOfBirth
                };
                if (context.Drivers != null)
                {
                    await context.Drivers.AddAsync(driver);
                }
                driversByName.Add(record.Driver, driver);
            }

            await context.SaveChangesAsync();

            return new JsonResult(driversByName.Count);
        }

        [HttpPost("RaceResults")]
        public async Task<IActionResult> ImportRaceResultsAsync()
        {
            Dictionary<string, RaceResults> raceResultsByName = context.RaceResults?
            .AsNoTracking().Where(x => x.RaceName != null).ToDictionary(x => x.RaceName!, StringComparer.OrdinalIgnoreCase)
            ?? new Dictionary<string, RaceResults>(StringComparer.OrdinalIgnoreCase);

            CsvConfiguration config = new(CultureInfo.InvariantCulture)
            {
                HasHeaderRecord = true,
                HeaderValidated = null
            };
            using StreamReader reader = new(_pathName);
            using CsvReader csv = new(reader, config);
            {
                IEnumerable<RaceResultsCSV>? records = csv.GetRecords<RaceResultsCSV>();
                foreach (RaceResultsCSV record in records)
                {
                    if (record.Track != null && raceResultsByName.ContainsKey(record.Track))
                    {
                        continue;
                    }

                    RaceResults raceResult = new()
                    {
                        RaceName = record.Track,
                        RacePosition = record.Position,
                        DriverID = record.DriverId,
                        RaceTeam = record.Team,
                        RaceStartingGrid = record.StartingGrid,
                        RaceLaps = record.Laps,
                        RaceTimeOrRetired = record.TimeOrRetired,
                        RacePoints = record.Points,
                        RaceSetFastestLap = record.FastestLap,
                        RaceFastestLapTime = record.FastestLapTime
                    };
                    if (context.RaceResults != null)
                    {
                        await context.RaceResults.AddAsync(raceResult);
                        if (record.Track != null)
                        {
                            raceResultsByName.Add(record.Track, raceResult);
                        }
                    }
                }
                await context.SaveChangesAsync();

                return new JsonResult(await context.SaveChangesAsync());
            }
        }
    }
}