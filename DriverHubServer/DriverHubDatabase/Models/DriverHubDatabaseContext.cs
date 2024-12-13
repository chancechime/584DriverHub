using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace DriverHubDatabase.Models;

public partial class DriverHubDatabaseContext : DbContext
{
    public DriverHubDatabaseContext()
    {
    }

    public DriverHubDatabaseContext(DbContextOptions<DriverHubDatabaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Driver> Drivers { get; set; }

    public virtual DbSet<DriversHistory> DriversHistories { get; set; }

    public virtual DbSet<Favorite> Favorites { get; set; }

    public virtual DbSet<Race> Races { get; set; }

    public virtual DbSet<RaceResult> RaceResults { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseSqlServer("Server=tcp:chance584.database.windows.net,1433;Initial Catalog=DriverHubDatabase;Persist Security Info=False;User ID=DHChance;Password=Butters13;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Driver>(entity =>
        {
            entity.HasKey(e => e.DriverId).HasName("PK__tmp_ms_x__F1B1CD24E6AB1FAF");

            entity.Property(e => e.DriverId)
                .ValueGeneratedNever()
                .HasColumnName("DriverID");
            entity.Property(e => e.Abbreviation)
                .HasMaxLength(3)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Country).HasMaxLength(50);
            entity.Property(e => e.DateOfBirth).HasMaxLength(50);
            entity.Property(e => e.Driver1)
                .HasMaxLength(100)
                .HasColumnName("Driver");
            entity.Property(e => e.HighestRaceFinish).HasMaxLength(10);
            entity.Property(e => e.No)
                .HasDefaultValueSql("((518))")
                .HasColumnName("NO");
            entity.Property(e => e.PlaceOfBirth).HasMaxLength(100);
            entity.Property(e => e.Team).HasMaxLength(50);
        });

        modelBuilder.Entity<DriversHistory>(entity =>
        {
            entity
                .HasNoKey()
                .ToTable("DriversHistory");

            entity.Property(e => e.Abbreviation)
                .HasMaxLength(3)
                .IsUnicode(false)
                .IsFixedLength();
            entity.Property(e => e.Country).HasMaxLength(50);
            entity.Property(e => e.DateOfBirth).HasMaxLength(50);
            entity.Property(e => e.Driver).HasMaxLength(100);
            entity.Property(e => e.DriverId).HasColumnName("DriverID");
            entity.Property(e => e.HighestRaceFinish).HasMaxLength(10);
            entity.Property(e => e.No).HasColumnName("NO");
            entity.Property(e => e.PlaceOfBirth).HasMaxLength(100);
            entity.Property(e => e.Team).HasMaxLength(50);
        });

        modelBuilder.Entity<Favorite>(entity =>
        {
            entity.HasKey(e => e.FavoriteId).HasName("PK__Favorite__CE74FAD5310A3C0A");

            entity.Property(e => e.CreatedAt)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");

            entity.HasOne(d => d.Driver).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.DriverId)
                .HasConstraintName("FK__Favorites__Drive__7C4F7684");

            entity.HasOne(d => d.Race).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.RaceId)
                .HasConstraintName("FK__Favorites__RaceI__6B24EA82");

            entity.HasOne(d => d.User).WithMany(p => p.Favorites)
                .HasForeignKey(d => d.UserId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK__Favorites__UserI__693CA210");
        });

        modelBuilder.Entity<Race>(entity =>
        {
            entity.HasNoKey();

            entity.Property(e => e.Column1).HasColumnName("column_1");
        });

        modelBuilder.Entity<RaceResult>(entity =>
        {
            entity.HasKey(e => e.RaceResultId).HasName("PK__RaceResu__A7D12EE24D901ED8");

            entity.Property(e => e.RaceResultId).ValueGeneratedNever();
            entity.Property(e => e.Team).HasMaxLength(50);
            entity.Property(e => e.TimeOrRetired).HasMaxLength(50);
            entity.Property(e => e.Track).HasMaxLength(100);

            entity.HasOne(d => d.RaceResultNavigation).WithOne(p => p.RaceResult)
                .HasForeignKey<RaceResult>(d => d.RaceResultId)
                .OnDelete(DeleteBehavior.ClientSetNull)
                .HasConstraintName("FK_RaceResults_Drivers");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PK__Users__1788CC4CB626C03B");

            entity.HasIndex(e => e.Username, "UQ__Users__536C85E4B4DB2158").IsUnique();

            entity.HasIndex(e => e.Email, "UQ__Users__A9D1053434645C72").IsUnique();

            entity.Property(e => e.DateCreated)
                .HasDefaultValueSql("(getdate())")
                .HasColumnType("datetime");
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.LastLogin).HasColumnType("datetime");
            entity.Property(e => e.PasswordHash).HasMaxLength(256);
            entity.Property(e => e.Role)
                .HasMaxLength(20)
                .HasDefaultValue("User");
            entity.Property(e => e.Username).HasMaxLength(50);
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
