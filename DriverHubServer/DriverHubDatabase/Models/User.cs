using System;
using System.Collections.Generic;

namespace DriverHubDatabase.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? Username { get; set; }

    public string? PasswordHash { get; set; }

    public string? Email { get; set; }

    public DateTime? DateCreated { get; set; }

    public DateTime? LastLogin { get; set; }

    public string? Role { get; set; }

    public virtual ICollection<Favorite> Favorites { get; set; } = new List<Favorite>();
}
