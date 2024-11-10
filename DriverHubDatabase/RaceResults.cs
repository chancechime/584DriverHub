using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DriverHubDatabase
{
    [Table("RaceResults")]
    public partial class RaceResults
    {
        [Column("DriverID")]
        public int DriverID { get; set; } = null!;
        
        [Key]
        [Column("RaceResultID")]
        public string RaceId { get; set; } = null!;

        [Column("Track")]
        [MaxLength(100)]
        [Unicode(false)]
        public string? RaceName { get; set; } = null!;
        
        [Column("Position")]
        public int? RacePosition { get; set; } = null!;

        [Column("Team")]
        [MaxLength(50)]
        [Unicode(false)]
        public string? RaceTeam { get; set; } = null!;

        [Column("StartingGrid")]
        public int? RaceStartingGrid { get; set; } = null!;

        [Column("Laps")]
        public int? RaceLaps { get; set; } = null!;

        [Column("TimeOrRetired")]
        [MaxLength(50)]
        [Unicode(false)]
        public string? RaceTimeOrRetired { get; set; } = null!;

        [Column("Points")]
        public float? RacePoints { get; set; } = null!;

        [Column("SetFastestLap")]
        public bool? RaceSetFastestLap { get; set; } = null!;

        [Column("FastestLapTime")]
        public float? RaceFastestLapTime { get; set; } = null!;

        [ForeignKey(nameof(DriverID))]
        [InverseProperty(nameof(Drivers.RaceResults))]
        public virtual Drivers Driver { get; set; } = null!;
    }
}
