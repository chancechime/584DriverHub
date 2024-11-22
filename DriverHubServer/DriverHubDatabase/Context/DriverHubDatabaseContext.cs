using System;
using System.Collections.Generic;
using DriverHubDatabase.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.Configuration.Json;

namespace DriverHubDatabase.Context;

public partial class DriverHubDatabaseContext : IdentityDbContext<AppUser>
{
    public DriverHubDatabaseContext() {}

    public DriverHubDatabaseContext(DbContextOptions<DriverHubDatabaseContext> options)
          : base(options) {}

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
        modelBuilder.Entity<Drivers>(entity =>
        {
            entity.HasKey(e => e.DriverId);
            entity.Property(e => e.DriverId).ValueGeneratedNever();
            entity.Property(e => e.DriverName).IsRequired().HasMaxLength(100);
            entity.Property(e => e.Abbreviation).IsRequired().HasMaxLength(3);
            entity.Property(e => e.DriverNumber).IsRequired();
            entity.Property(e => e.DriverTeam).IsRequired().HasMaxLength(50);
            entity.Property(e => e.DriverCountry).IsRequired().HasMaxLength(50);
            entity.Property(e => e.DriverPodiums).IsRequired();
            entity.Property(e => e.DriverPoints).IsRequired();
            entity.Property(e => e.DriverGPEntered).IsRequired();
            entity.Property(e => e.DriverChampionships).IsRequired();
            entity.Property(e => e.DriverHIRaceFinish).IsRequired();
            entity.Property(e => e.DriverHIGridPos).IsRequired();
            entity.Property(e => e.DateOfBirth).IsRequired();
            entity.Property(e => e.PlaceOfBirth).IsRequired().HasMaxLength(50);
            entity.Property(e => e.SeasonYear).IsRequired();
        });

        modelBuilder.Entity<RaceResults>(entity =>
        {
            entity.HasKey(e => e.RaceId);
            entity.Property(e => e.RaceId).ValueGeneratedNever();
            entity.Property(e => e.RaceName).IsRequired().HasMaxLength(50);
            entity.Property(e => e.RacePosition).IsRequired();
            entity.Property(e => e.RaceTeam).IsRequired().HasMaxLength(50);
            entity.Property(e => e.RaceStartingGrid).IsRequired();
            entity.Property(e => e.RaceLaps).IsRequired();
            entity.Property(e => e.RaceTimeOrRetired).IsRequired().HasMaxLength(50);
            entity.Property(e => e.RacePoints).IsRequired();
            entity.Property(e => e.RaceSetFastestLap).IsRequired();
            entity.Property(e => e.RaceFastestLapTime).IsRequired();
            entity.HasOne(d => d.Driver)
                .WithMany(p => p.RaceResults)
                .HasForeignKey(d => d.DriverID)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RaceResults_Drivers");
        });
    }
}