using System;
using System.Collections.Generic;
using DriverHubDatabase.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;

namespace DriverHubDatabase.Context
{
    public partial class DriverHubDatabaseContext : IdentityDbContext<AppUser>
    {
        public DriverHubDatabaseContext() { }

        public DriverHubDatabaseContext(DbContextOptions<DriverHubDatabaseContext> options)
              : base(options) { }

        public virtual DbSet<Drivers>? Drivers { get; set; }

        public virtual DbSet<RaceResults>? RaceResults { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (optionsBuilder.IsConfigured) return;

            IConfiguration configuration = new ConfigurationBuilder()
                .AddJsonFile("appsettings.json", optional: false)
                .Build();

            optionsBuilder.UseSqlServer(
                configuration.GetConnectionString("DefaultConnection"),
                sqlServerOptions => sqlServerOptions.EnableRetryOnFailure());
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configure the Drivers entity
            modelBuilder.Entity<Drivers>(entity =>
            {
                entity.ToTable("Drivers"); // Maps to the existing Drivers table
                entity.HasKey(e => e.DriverId); // Sets DriverId as the primary key

                entity.Property(e => e.DriverId).ValueGeneratedNever(); // Prevent EF from generating IDs
                entity.Property(e => e.DriverName).IsRequired().HasMaxLength(100); // Maps to varchar(100)
                entity.Property(e => e.Abbreviation).IsRequired().HasMaxLength(3); // Maps to varchar(3)
                entity.Property(e => e.DriverNumber).IsRequired(); // Maps to tinyint
                entity.Property(e => e.DriverTeam).IsRequired().HasMaxLength(50); // Maps to varchar(50)
                entity.Property(e => e.DriverCountry).IsRequired().HasMaxLength(50); // Maps to varchar(50)
                entity.Property(e => e.DriverPodiums).IsRequired(); // Maps to int
                entity.Property(e => e.DriverPoints).IsRequired(); // Maps to real
                entity.Property(e => e.DriverGPEntered).IsRequired(); // Maps to int
                entity.Property(e => e.DriverChampionships).IsRequired(); // Maps to int
                entity.Property(e => e.DriverHIRaceFinish).IsRequired(); // Maps to int
                entity.Property(e => e.DriverHIGridPos).IsRequired(); // Maps to int
                entity.Property(e => e.DateOfBirth).IsRequired(); // Maps to datetime2
                entity.Property(e => e.PlaceOfBirth).IsRequired().HasMaxLength(50); // Maps to varchar(50)
                entity.Property(e => e.SeasonYear).IsRequired(); // Maps to datetime2
            });

            // Configure the RaceResults entity
            modelBuilder.Entity<RaceResults>(entity =>
            {
                entity.ToTable("RaceResults"); // Maps to the existing RaceResults table
                entity.HasKey(e => e.RaceId); // Sets RaceId as the primary key

                entity.Property(e => e.RaceId).ValueGeneratedNever(); // Prevent EF from generating IDs
                entity.Property(e => e.RaceName).IsRequired().HasMaxLength(50); // Maps to varchar(50)
                entity.Property(e => e.RacePosition).IsRequired(); // Maps to int
                entity.Property(e => e.RaceTeam).IsRequired().HasMaxLength(50); // Maps to varchar(50)
                entity.Property(e => e.RaceStartingGrid).IsRequired(); // Maps to int
                entity.Property(e => e.RaceLaps).IsRequired(); // Maps to int
                entity.Property(e => e.RaceTimeOrRetired).IsRequired().HasMaxLength(50); // Maps to varchar(50)
                entity.Property(e => e.RacePoints).IsRequired(); // Maps to int
                entity.Property(e => e.RaceSetFastestLap).IsRequired(); // Maps to boolean or equivalent
                entity.Property(e => e.RaceFastestLapTime).IsRequired(); // Maps to time or equivalent

                // Define the foreign key relationship between RaceResults and Drivers
                entity.HasOne(d => d.Driver)
                    .WithMany(p => p.RaceResults) // Navigation property in Drivers
                    .HasForeignKey(d => d.DriverID) // Foreign key in RaceResults
                    .OnDelete(DeleteBehavior.ClientSetNull) // Prevent cascade delete
                    .HasConstraintName("FK_RaceResults_Drivers"); // Optional: name the constraint
            });
        }
    }
}
