using System.Net;

namespace Mouse.NET.Common;

public class ApiException : Exception
{
    public ApiException(
        string name,
        int statusCode = (int)HttpStatusCode.BadRequest,
        IEnumerable<string>? messages = null,
        Exception? innerException = null) : base(messages?.FirstOrDefault() ?? name, innerException)
    {
        this.Name = name;
        this.StatusCode = statusCode;
        this.Messages = messages?.ToArray() ?? Array.Empty<string>();
    }

    public string Name { get; }

    public int StatusCode { get; }

    public IReadOnlyCollection<string> Messages { get; }

    public static string ToErrorCode(string name)
    {
        if (string.IsNullOrWhiteSpace(name))
        {
            return string.Empty;
        }

        var result = new List<char>(name.Length + 8);
        for (var i = 0; i < name.Length; i++)
        {
            var ch = name[i];
            if (char.IsUpper(ch))
            {
                if (i > 0)
                {
                    result.Add('_');
                }
                result.Add(char.ToLowerInvariant(ch));
                continue;
            }

            result.Add(ch == '-' ? '_' : char.ToLowerInvariant(ch));
        }

        return new string(result.ToArray());
    }
}

public sealed class ApiBadRequestException : ApiException
{
    public ApiBadRequestException(string name, IEnumerable<string>? messages = null, Exception? innerException = null)
        : base(name, (int)HttpStatusCode.BadRequest, messages, innerException)
    {
    }
}

public sealed class ApiUnauthorizedException : ApiException
{
    public ApiUnauthorizedException(string name, IEnumerable<string>? messages = null, Exception? innerException = null)
        : base(name, (int)HttpStatusCode.Unauthorized, messages, innerException)
    {
    }
}

public sealed class ApiForbiddenException : ApiException
{
    public ApiForbiddenException(string name, IEnumerable<string>? messages = null, Exception? innerException = null)
        : base(name, (int)HttpStatusCode.Forbidden, messages, innerException)
    {
    }
}

public sealed class ApiNotFoundException : ApiException
{
    public ApiNotFoundException(string name, IEnumerable<string>? messages = null, Exception? innerException = null)
        : base(name, (int)HttpStatusCode.NotFound, messages, innerException)
    {
    }
}

public sealed class ApiConflictException : ApiException
{
    public ApiConflictException(string name, IEnumerable<string>? messages = null, Exception? innerException = null)
        : base(name, (int)HttpStatusCode.Conflict, messages, innerException)
    {
    }
}

public sealed class ApiInternalServerErrorException : ApiException
{
    public ApiInternalServerErrorException(string name, IEnumerable<string>? messages = null, Exception? innerException = null)
        : base(name, (int)HttpStatusCode.InternalServerError, messages, innerException)
    {
    }
}
