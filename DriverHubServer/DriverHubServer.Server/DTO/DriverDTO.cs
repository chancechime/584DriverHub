namespace DriverHubServer.Server.DTO
{
    public class Driver
    {
        public int Id { get; set; }
        public required string Abbreviation { get; set; }
        public required string DriverName { get; set; }
        public int DriverNumber { get; set; }
        public required string Team { get; set; }
        public int Podiums { get; set; }
        public int Points { get; set; }
        public int GrandPrixEntered { get; set; }
        public int WorldChampionships { get; set; }
        public int HighestRaceFinish { get; set; }
        public int HighestGridPosition { get; set; }
        public required string DateOfBirth { get; set; }
        public required string PlaceOfBirth { get; set; }
        public int SeasonYear { get; set; }
    }
}