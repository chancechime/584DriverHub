using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace DriverHubDatabase
{
    [Table("Drivers")]
    public partial class Driver
    {
        [Key]
        [Column("DriverID")]
        public string DriverId { get; set; } = null!;

        [Column("Abbreviation")]
        [MaxLength(3)]
        [Unicode(false)]
        public string? Abbreviation { get; set; } = null!;

        [Column("Driver")]
        [MaxLength(100)]
        [Unicode(false)]
        public string? DriverName { get; set; } = null!;

        [Column("NO")]
        public byte? DriverNumber { get; set; } = null!;

        [Column("Team")]
        [MaxLength(50)]
        [Unicode(false)]
        public string? DriverTeam { get; set; } = null!;

        [Column("Country")]
        [MaxLength(50)]
        [Unicode(false)]
        public string? DriverCountry { get; set; } = null!;

        [Column("Podiums")]
        public int? DriverPodiums { get; set; } = null!;

        [Column("Points")]
        public float? DriverPoints { get; set; } = null!;

        [Column("GrandsPrixEntered")]
        public int? DriverGPEntered { get; set; } = null!;

        [Column("WorldChampionships")]
        public int? DriverChampionships { get; set; } = null!;

        [Column("HighestRaceFinish")]
        public int? DriverHIRaceFinish { get; set; } = null!;

        [Column("HighestGridPosition")]
        public int? DriverHIGridPos { get; set; } = null!;

        [Column("DateOfBirth")]
        public DateTime? DateOfBirth { get; set; } = null!;

        [Column("PlaceOfBirth")]
        [MaxLength(50)]
        [Unicode(false)]
        public string? PlaceOfBirth { get; set; } = null!;

        [Column("SeasonYear")]
        public DateTime? SeasonYear { get; set; } = null!;

        [InverseProperty("Driver")]
        public virtual ICollection<RaceResults> RaceResults { get; set; } = new List<RaceResults>();
    }
}
