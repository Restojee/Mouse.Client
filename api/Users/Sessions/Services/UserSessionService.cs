using AutoMapper;
using Mouse.NET.Common;
using Mouse.NET.Data.Models;
using Mouse.NET.Users.Sessions.Data;
using Mouse.NET.Users.Sessions.Models;

namespace Mouse.NET.Users.Sessions.Services;

public class UserSessionService : IUserSessionService
{
    private readonly IUserSessionRepository repository;
    private readonly IMapper mapper;

    public UserSessionService(IUserSessionRepository repository, IMapper mapper)
    {
        this.repository = repository;
        this.mapper = mapper;
    }

    public async Task<PagedResult<UserSessionDto>> Collect(UserSessionCollectRequest request)
    {
        var paged = await this.repository.Collect(request);
        var records = paged.Records.Select(x => new UserSessionDto
        {
            Id = x.Id,
            UserId = x.UserId,
            UserName = x.User?.UserName,
            Ip = x.Ip,
            UserAgent = x.UserAgent,
            Device = x.Device,
            Success = x.Success,
            FailureReason = x.FailureReason,
            CreatedUtcDate = x.CreatedUtcDate,
        }).ToList();

        return new PagedResult<UserSessionDto>(records, paged.Page, paged.PageSize, paged.TotalItems, paged.TotalPages);
    }
}
