using System;
using System.Collections.Generic;

namespace DriverHubDatabase.Models;

public partial class Favorite
{
    public int FavoriteId { get; set; }

    public int UserId { get; set; }

    public int? DriverId { get; set; }

    public int? RaceId { get; set; }

    public DateTime? CreatedAt { get; set; }

    public virtual Driver? Driver { get; set; }

    public virtual RaceResult? Race { get; set; }

    public virtual User User { get; set; } = null!;
}
