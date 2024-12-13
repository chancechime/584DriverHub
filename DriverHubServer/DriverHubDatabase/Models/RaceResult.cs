using System;
using System.Collections.Generic;

namespace DriverHubDatabase.Models;

public partial class RaceResult
{
    public int RaceResultId { get; set; }

    public string? Track { get; set; }

    public int? Position { get; set; }

    public int? DriverId { get; set; }

    public string? Team { get; set; }

    public int? StartingGrid { get; set; }

    public int? Laps { get; set; }

    public string? TimeOrRetired { get; set; }

    public int? Points { get; set; }

    public bool? FastestLap { get; set; }

    public virtual ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();

    public virtual Driver RaceResultNavigation { get; set; } = null!;
}
