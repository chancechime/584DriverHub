using System;
using System.Collections.Generic;

namespace DriverHubDatabase.Models;

public partial class DriversHistory
{
    public int? DriverId { get; set; }

    public string Abbreviation { get; set; } = null!;

    public string? Driver { get; set; }

    public byte No { get; set; }

    public string? Team { get; set; }

    public string? Country { get; set; }

    public int? Podiums { get; set; }

    public double? Points { get; set; }

    public int? GrandsPrixEntered { get; set; }

    public byte? WorldChampionships { get; set; }

    public string? HighestRaceFinish { get; set; }

    public short? HighestGridPosition { get; set; }

    public string? DateOfBirth { get; set; }

    public string? PlaceOfBirth { get; set; }

    public short SeasonYear { get; set; }
}
