namespace Mouse.NET.Roles.Models;

public class RolePolicyInfo
{
    public string Key { get; set; }

    public string Name { get; set; }

    public string Label { get; set; }

    public string Group { get; set; }

    public RolePolicyPermission[] Permissions { get; set; } = Array.Empty<RolePolicyPermission>();
}

public class RolePolicyPermission
{
    public string Key { get; set; }

    public string Label { get; set; }

    public bool Granted { get; set; }
}
