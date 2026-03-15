using System.Net;
using System.Text.Json;
using System.Text.Encodings.Web;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Hosting;

namespace Mouse.NET.Common;

public class ExceptionHandlingMiddleware
{
    private readonly RequestDelegate next;
    private readonly IHostEnvironment env;

    public ExceptionHandlingMiddleware(RequestDelegate next, IHostEnvironment env)
    {
        this.next = next;
        this.env = env;
    }

    public async Task Invoke(HttpContext context)
    {
        try
        {
            await this.next(context);
        }
        catch (Exception ex)
        {
            await this.HandleException(context, ex);
        }
    }

    private async Task HandleException(HttpContext context, Exception ex)
    {
        var (statusCode, err) = ToApiError(ex);

        context.Response.ContentType = "application/json; charset=utf-8";
        context.Response.StatusCode = statusCode;

        var response = new ApiErrorResponse { Err = err };

        var json = JsonSerializer.Serialize(response, new JsonSerializerOptions
        {
            PropertyNamingPolicy = JsonNamingPolicy.CamelCase,
            Encoder = JavaScriptEncoder.UnsafeRelaxedJsonEscaping,
        });

        await context.Response.WriteAsync(json);
    }

    private (int StatusCode, ApiError Err) ToApiError(Exception ex)
    {
        if (ex is ApiException api)
        {
            return (api.StatusCode, new ApiError
            {
                Name = api.Name,
                Code = ApiException.ToErrorCode(api.Name),
                Messages = api.Messages.ToArray(),
                System = this.env.IsDevelopment() ? BuildSystem(api) : null,
            });
        }

        if (ex is BadHttpRequestException badRequest)
        {
            return ((int)HttpStatusCode.BadRequest, new ApiError
            {
                Name = "BadRequest",
                Code = "bad_request",
                Messages = new[] { badRequest.Message },
                System = this.env.IsDevelopment() ? BuildSystem(badRequest) : null,
            });
        }

        if (ex is UnauthorizedAccessException)
        {
            return ((int)HttpStatusCode.Unauthorized, new ApiError
            {
                Name = "Unauthorized",
                Code = "unauthorized",
                Messages = new[] { "Unauthorized" },
                System = this.env.IsDevelopment() ? BuildSystem(ex) : null,
            });
        }

        return ((int)HttpStatusCode.InternalServerError, new ApiError
        {
            Name = "InternalServerError",
            Code = "internal_server_error",
            Messages = new[] { "Internal server error" },
            System = this.env.IsDevelopment() ? BuildSystem(ex) : null,
        });
    }

    private static ICollection<string> BuildSystem(Exception ex)
    {
        var system = new List<string>
        {
            ex.GetType().FullName ?? ex.GetType().Name,
            ex.Message,
        };

        if (!string.IsNullOrWhiteSpace(ex.StackTrace))
        {
            system.Add(ex.StackTrace);
        }

        if (ex.InnerException != null)
        {
            system.Add($"Inner: {ex.InnerException.GetType().FullName} - {ex.InnerException.Message}");
            if (!string.IsNullOrWhiteSpace(ex.InnerException.StackTrace))
            {
                system.Add(ex.InnerException.StackTrace);
            }
        }

        return system;
    }
}
