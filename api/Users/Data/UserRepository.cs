using Microsoft.EntityFrameworkCore;
using Mouse.NET.Common;
using Mouse.NET.Data;
using Mouse.NET.Data.Models;
using Mouse.NET.Users.Models;

namespace Mouse.NET.Users.Data;

public class UserRepository : IUserRepository
{
    private readonly MouseDbContext context;
    
    public UserRepository(MouseDbContext context)
    {
        this.context = context;
    }
    
    public async Task<PagedResult<UserEntity>> GetUserCollection(UserCollectionGetRequest request)
    {
        var query = this.context.Users.Select(user => new UserEntity()
        {
            Id = user.Id,
            UserName = user.UserName,
            Email = user.Email,
            Avatar = user.Avatar,
            Role = user.Role,
            CompletedCount = user.Completed.Select(c => c.Id).ToList().Count,
            FavoritesCount = user.Favorites.Select(f => f.Id).ToList().Count,
            LevelsCount = user.Levels.Select(l => l.Id).ToList().Count,
            CommentsCount = user.Comments.Select(c => c.Id).ToList().Count,
            CreatedUtcDate = user.CreatedUtcDate,
            ModifiedUtcDate = user.ModifiedUtcDate,
        }).AsQueryable();

        query = ApplySorting(query, request);

        return await PaginationExtensions.ToPagedResult(query, request.Page, request.Size);
    }

    private static IQueryable<UserEntity> ApplySorting(IQueryable<UserEntity> query, PaginateRequest request)
    {
        var field = request.SortField;
        var direction = request.SortDirection;

        if (string.IsNullOrWhiteSpace(field) || string.IsNullOrWhiteSpace(direction))
        {
            return query.OrderByDescending(x => x.CreatedUtcDate);
        }

        var isDesc = string.Equals(direction, "desc", StringComparison.OrdinalIgnoreCase);

        return field switch
        {
            "user" => isDesc ? query.OrderByDescending(x => x.UserName) : query.OrderBy(x => x.UserName),
            "email" => isDesc ? query.OrderByDescending(x => x.Email) : query.OrderBy(x => x.Email),
            "role" => isDesc ? query.OrderByDescending(x => x.Role) : query.OrderBy(x => x.Role),
            "createdUtcDate" => isDesc ? query.OrderByDescending(x => x.CreatedUtcDate) : query.OrderBy(x => x.CreatedUtcDate),
            "modifiedUtcDate" => isDesc ? query.OrderByDescending(x => x.ModifiedUtcDate) : query.OrderBy(x => x.ModifiedUtcDate),
            _ => query.OrderByDescending(x => x.CreatedUtcDate)
        };
    }
    
    public async Task<UserEntity?> GetUser(int userId)
    { 
       return await this.context.Users.FirstOrDefaultAsync(user => user.Id.Equals(userId));
    }

    public async Task<UserEntity?> GetUserWithStatistic(int userId)
    {
        return await this.context.Users.Select(user => new UserEntity()
        {
            Id = user.Id,
            UserName = user.UserName,
            Avatar = user.Avatar,
            Role = user.Role,
            CompletedCount = user.Completed.Select(c => c.Id).ToList().Count,
            FavoritesCount = user.Favorites.Select(f => f.Id).ToList().Count,
            LevelsCount = user.Levels.Select(l => l.Id).ToList().Count,
            CommentsCount = user.Comments.Select(c => c.Id).ToList().Count,
            CreatedUtcDate = user.CreatedUtcDate,
            ModifiedUtcDate = user.ModifiedUtcDate,
        }).FirstOrDefaultAsync(user => user.Id.Equals(userId));

    }
    
    public async Task<UserEntity?> GetUserByUserName(string userName)
    { 
        return await this.context.Users.Where(user => user.UserName == userName).FirstOrDefaultAsync();
    }

    public async Task<UserEntity?> CreateUser(UserEntity user)
    {
        await this.context.Users.AddAsync(user);
        await this.context.SaveChangesAsync();
        
        return await this.GetUser(user.Id);
    }

    public async Task<UserEntity?> UpdateUser(UserEntity user)
    {
        this.context.Entry(user).State = EntityState.Modified;
        await this.context.SaveChangesAsync();
        
        return await this.GetUser(user.Id);
    }

    public async Task DeleteUser(UserEntity user)
    {
        this.context.Users.Remove(user);
        await this.context.SaveChangesAsync();
    }
}