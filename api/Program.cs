  namespace Mouse.NET;

using System;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Mouse.NET.Data;
using Mouse.NET.Storage;

public class Program
{
    public static void Main(string[] args)
    {
        if (args.Length > 0 && string.Equals(args[0], "ensure-variants", StringComparison.OrdinalIgnoreCase))
        {
            RunEnsureVariants(args).GetAwaiter().GetResult();
            return;
        }

        CreateHostBuilder(args).Build().Run();
    }

    private static async Task RunEnsureVariants(string[] args)
    {
        var overwrite = args.Any(a => string.Equals(a, "--overwrite", StringComparison.OrdinalIgnoreCase));

        using var host = CreateHostBuilder(args).Build();
        using var scope = host.Services.CreateScope();

        var db = scope.ServiceProvider.GetRequiredService<MouseDbContext>();
        var storage = scope.ServiceProvider.GetRequiredService<IStorageService>();

        var levelImages = await db.Levels
            .AsNoTracking()
            .Where(x => x.Image != null && x.Image != "")
            .Select(x => x.Image!)
            .Distinct()
            .ToListAsync();

        var completedImages = await db.LevelCompleted
            .AsNoTracking()
            .Where(x => x.Image != null && x.Image != "")
            .Select(x => x.Image)
            .Distinct()
            .ToListAsync();

        var all = levelImages
            .Concat(completedImages)
            .Where(x => !string.IsNullOrWhiteSpace(x))
            .Distinct(StringComparer.OrdinalIgnoreCase)
            .ToList();

        Console.WriteLine($"ensure-variants: found {all.Count} unique images. overwrite={overwrite}");

        var ok = 0;
        var failed = 0;
        foreach (var image in all)
        {
            try
            {
                await storage.EnsureImageVariants(image, overwrite: overwrite);
                ok++;
                Console.WriteLine($"OK {ok}/{all.Count}: {image}");
            }
            catch (Exception ex)
            {
                failed++;
                Console.WriteLine($"FAIL {image}: {ex.Message}");
            }
        }

        Console.WriteLine($"ensure-variants done. ok={ok} failed={failed}");
    }

    private static IHostBuilder CreateHostBuilder(string[] args) =>
        Host
            .CreateDefaultBuilder(args)
            .ConfigureWebHostDefaults(webBuilder =>
            {
                webBuilder.UseStartup<Startup>();
                webBuilder.ConfigureKestrel(serverOptions =>
                    {
                        serverOptions.Listen(IPAddress.Any, 8000);
                    });
            });
}