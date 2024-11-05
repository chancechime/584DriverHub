namespace DriverHubServer.Data
{
    public class DriverHubCSV
    {
        public string DriverId { get; set; } = null!;
        public string Abbreviation { get; set; } = null!;
        public string Driver { get; set; } = null!;
        public int? Number { get; set; } = null!;
        public string Team { get; set; } = null!;
        public string Podium { get; set; } = null!;
        public string Points { get; set; } = null!;
        public int? GpEntered { get; set; } = null!; // Grand Prix Entered
        public int? WorldChampionships { get; set; } = null!;
        public int? HiRaceFinish { get; set; } = null!;
        public int? HiGridFinish { get; set; } = null!;
        public DateTime DateOfBirth { get; set; }
        public string PlaceOfBirth { get; set; } = null!;
        public DateTime SeasonYear { get; set; } = DateTime.MinValue;

    }
}
