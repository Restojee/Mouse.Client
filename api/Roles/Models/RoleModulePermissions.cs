namespace Mouse.NET.Roles.Models;

public class RolePolicyInfo
{
    public string Key { get; set; }

    public string Name { get; set; }

    public bool IsCrud { get; set; }

    public bool Create { get; set; }

    public bool Read { get; set; }

    public bool Update { get; set; }

    public bool Delete { get; set; }

    public bool All { get; set; }
}
