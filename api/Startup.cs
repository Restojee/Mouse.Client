using System.Text;
using System.Linq;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Caching.Memory;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Minio;
using Mouse.NET.Auth.Services;
using Mouse.NET.Common;
using Mouse.NET.Data;
using Mouse.NET.Data.Models;
using Mouse.NET.Invites.Data;
using Mouse.NET.Invites.Services;
using Mouse.NET.LevelComments.Data;
using Mouse.NET.LevelComments.services;
using Mouse.NET.Levels.Data;
using Mouse.NET.Levels.services;
using Mouse.NET.LevelTags.Data;
using Mouse.NET.LevelTags.Services;
using Mouse.NET.Messages.Data;
using Mouse.NET.Messages.services;
using Mouse.NET.Roles.Data;
using Mouse.NET.Roles.services;
using Mouse.NET.Storage;
using Mouse.NET.Tags.Data;
using Mouse.NET.Tags.services;
using Mouse.NET.Tips.Data;
using Mouse.NET.Tips.services;
using Mouse.NET.Users.Data;
using Mouse.NET.Users.services;
using Mouse.Stick.Controllers.Auth;
using Mouse.NET.Users.Common;
using Mouse.NET.Users.Sessions.Data;
using Mouse.NET.Users.Sessions.Services;
using Mouse.NET.Users.Audit.Data;
using Mouse.NET.Users.Audit.Services;
using Mouse.NET.Users.Telemetry;

namespace Mouse.NET;

    public class Startup
    {
        private readonly IConfiguration configuration;
        
        public Startup(IConfiguration configuration)
        {
            this.configuration = configuration;
        }
        
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddHttpContextAccessor();
            services.AddCors();
            services.AddCors(o => o.AddPolicy("CorsPolicy", builder =>
            {
                builder
                    .WithOrigins(this.configuration.GetSection("CorsSettings:AllowedOrigins").Get<string[]>())
                    .WithMethods(this.configuration.GetSection("CorsSettings:AllowedMethods").Get<string[]>())
                    .WithHeaders(this.configuration.GetSection("CorsSettings:AllowedHeaders").Get<string[]>());
            }));
            services.AddSingleton<IMemoryCache, MemoryCache>();
            services.AddAutoMapper(AppDomain.CurrentDomain.GetAssemblies());
            services.AddDbContext<MouseDbContext>(c => 
                c.UseNpgsql(this.configuration.GetConnectionString("DefaultConnection"))
            );
            services.AddRouting();
            services.AddAuthorization(options =>
            {
                options.AddPolicy("AnyAuthenticated", policy => policy.RequireAuthenticatedUser());

                foreach (var policyName in Enum.GetNames<Policy>())
                {
                    options.AddPolicy(policyName, policy => policy
                        .RequireAuthenticatedUser()
                        .RequireClaim("policy", policyName));
                }

                foreach (var policyName in Enum.GetNames<OtherPolicy>())
                {
                    options.AddPolicy(policyName, policy => policy
                        .RequireAuthenticatedUser()
                        .RequireClaim("otherPolicy", policyName));
                }
            });
            services.AddControllers()
                .AddJsonOptions(options =>
                {
                    options.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.IgnoreCycles;
                });
            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
                .AddJwtBearer(options =>
                {
                    options.RequireHttpsMetadata = false;
                    options.TokenValidationParameters = new TokenValidationParameters
                    {
                        ValidateIssuer = false,
                        ValidIssuer = "MyAuthServer",
                        ValidateAudience = false,
                        ValidAudience = "MyAuthClient",
                        ValidateLifetime = true,
                        RoleClaimType = UserDetails.Role,
                        IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes("this is my custom Secret key for authnetication")),
                        ValidateIssuerSigningKey = true,
                    };
                });
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new OpenApiInfo {Title = "MouseAPI", Version = "v1"});
                c.AddSecurityDefinition("Bearer", new OpenApiSecurityScheme
                {
                    In = ParameterLocation.Header,
                    Description = "Please insert JWT with Bearer into field",
                    Name = "Authorization",
                    Type = SecuritySchemeType.ApiKey
                });
                //c.EnableAnnotations();
                c.AddSecurityRequirement(new OpenApiSecurityRequirement {
                    { 
                        new OpenApiSecurityScheme 
                        { 
                            Reference = new OpenApiReference { Type = ReferenceType.SecurityScheme, Id = "Bearer" } 
                        },
                        new string[] { } 
                    } 
                });
            });
            this.ConfigureDependencyInjection(services);
        }
        
        public void Configure(IApplicationBuilder app)
        {
            app.UseMiddleware<ExceptionHandlingMiddleware>();
            app.UseMiddleware<RequestAuditMiddleware>();
            app.UseCors("CorsPolicy");
            app.UseRouting();

            app.UseAuthentication();
            app.UseAuthorization();

            app.UseSwagger();
            app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "Mouse.Stick v1"));

            app.UseEndpoints(endpoints => { endpoints.MapControllers(); });
        }
        
        private void ConfigureDependencyInjection(IServiceCollection services)
        {
            services.AddScoped<ILevelRepository, LevelRepository>();
            services.AddScoped<ILevelService, LevelService>();
            services.AddScoped<ILevelTagRepository, LevelTagRepository>();
            services.AddScoped<ILevelTagService, LevelTagService>();
            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IUserRepository, UserRepository>();
            services.AddScoped<ILevelCommentService, LevelCommentService>();
            services.AddScoped<ILevelCommentRepository, LevelCommentRepository>();
            services.AddScoped<ITipService, TipService>();
            services.AddScoped<ITipRepository, TipRepository>();
            services.AddScoped<ITagService, TagService>();
            services.AddScoped<ITagRepository, TagRepository>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddTransient<JwtService>();
            services.AddScoped<IMinioService, MinioService>();
            services.AddScoped<IStorageService, StorageService>();
            services.AddScoped<IMessageService, MessageService>();
            services.AddScoped<IMessageRepository, MessageRepository>();
            services.AddScoped<IInviteService, InviteService>();
            services.AddScoped<IInviteRepository, InviteRepository>();

            services.AddScoped<IUserSessionRepository, UserSessionRepository>();
            services.AddScoped<IUserSessionService, UserSessionService>();
            services.AddScoped<IUserSessionLogger, UserSessionLogger>();

            services.AddScoped<IUserAuditLogRepository, UserAuditLogRepository>();
            services.AddScoped<IUserAuditLogService, UserAuditLogService>();
            services.AddScoped<IAuditLogWriter, AuditLogWriter>();

            services.AddScoped<IRequestContext, RequestContext>();

            services.AddScoped<IRoleRepository, RoleRepository>();
            services.AddScoped<IRoleService, RoleService>();
        }
    }
