namespace DriverHubServer.Data
{
    public class DriverHubCSV
    {
        public string DriverID { get; set; } = null!; // Driver ID (Database Primary Key)
        public string Abbreviation { get; set; } = null!; // Abbreviation
        public string Driver { get; set; } = null!; // Driver Name
        public int? Number { get; set; } = null!; // Driver Number
        public string Team { get; set; } = null!; // Team Name
        public string Country { get; set; } = null!; // Country of Origin
        public string Podiums { get; set; } = null!; // Number of Podiums
        public string Points { get; set; } = null!; // Number of Points
        public int? GpEntered { get; set; } = null!; // Grand Prix Entered
        public int? WorldChampionships { get; set; } = null!; // World Championships
        public int? HiRaceFinish { get; set; } = null!; // Highest Race Finish
        public int? HiGridPosition { get; set; } = null!; // Highest Grid Poisition
        public DateTime DateOfBirth { get; set; } = DateTime.MinValue; // Date of Birth
        public string PlaceOfBirth { get; set; } = null!; // Place of Birth
        public DateTime SeasonYear { get; set; } = DateTime.MinValue;
    }
}
