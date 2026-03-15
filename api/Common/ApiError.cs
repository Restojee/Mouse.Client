namespace Mouse.NET.Common;

public class ApiError
{
    public string Name { get; set; }

    public string? Code { get; set; }

    public ICollection<string> Messages { get; set; }

    public ICollection<string>? System { get; set; }
}

public class ApiErrorResponse
{
    public ApiError Err { get; set; }
}
