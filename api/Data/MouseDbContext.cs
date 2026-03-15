using Mouse.NET.Data.Models;

namespace Mouse.NET.Data;
using Microsoft.EntityFrameworkCore;

public class MouseDbContext : DbContext
{
    public MouseDbContext(DbContextOptions<MouseDbContext> options) : base(options) {}
    
    public DbSet<LevelEntity> Levels { get; set; }
    
    public DbSet<LevelFavoriteEntity> LevelFavorites { get; set; }
    
    public DbSet<LevelCompletedEntity> LevelCompleted { get; set; }
    
    public DbSet<LevelCommentEntity> LevelComments { get; set; }
    
    public DbSet<TagEntity> Tags { get; set; }
    
    public DbSet<TipEntity> Tips { get; set; }
    
    public DbSet<UserEntity> Users { get; set; }
    
    public DbSet<LevelTagRelation> LevelTagRelations { get; set; }
    
    public DbSet<LevelVisitEntity> LevelVisits { get; set; }
    
    public DbSet<MessageEntity> Messages { get; set; }
    
    public DbSet<LevelNoteEntity> LevelNotes { get; set; }
    
    public DbSet<InviteEntity> Invites { get; set; }

    public DbSet<UserSessionEntity> UserSessions { get; set; }

    public DbSet<UserAuditLogEntity> UserAuditLogs { get; set; }

    public DbSet<RoleEntity> Roles { get; set; }

    public DbSet<RolePolicyBindingEntity> RolePolicyBindings { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder);

        builder.Entity<TagEntity>()
            .HasOne(t => t.ParentTag)
            .WithMany()
            .HasForeignKey(t => t.ParentTagId)
            .OnDelete(DeleteBehavior.Restrict);

        builder.Entity<LevelEntity>()
            .HasMany(l => l.Tags)
            .WithMany(t => t.Levels)
            .UsingEntity<LevelTagRelation>(
                l => l
                    .HasOne(x => x.Tag)
                    .WithMany()
                    .HasForeignKey(l => l.TagId),
                t => t
                    .HasOne(x => x.Level)
                    .WithMany()
                    .HasForeignKey(t => t.LevelId)
            );

        builder.Entity<RolePolicyBindingEntity>()
            .HasKey(x => new { x.RoleId, x.PolicyType, x.PolicyKey });

        builder.Entity<RolePolicyBindingEntity>()
            .HasOne(x => x.Role)
            .WithMany()
            .HasForeignKey(x => x.RoleId);
    }
}