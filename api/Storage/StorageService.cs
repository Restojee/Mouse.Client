using Minio;
using Mouse.NET.Common;
using System.Collections.Generic;
using System.Linq;
using Mouse.NET.Storage.Models;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.PixelFormats;
using SixLabors.ImageSharp.Processing;

namespace Mouse.NET.Storage;

public class StorageService : IStorageService
{
    private readonly IMinioService minioService;
    private readonly IConfiguration configuration;

    private const string BucketName = "maps";

    public StorageService(IMinioService minioService, IConfiguration configuration)
    {
        this.minioService = minioService;
        this.configuration = configuration;
    }

    public async Task<string> Upload(IFormFile file)
    {
        var result = await UploadWithVariants(file);
        return result.ObjectName;
    }

    public async Task<StorageUploadResult> UploadWithVariants(IFormFile file)
    {
        string fileName = Guid.NewGuid().ToString();

        try
        {
            await this.minioService.MinioClient.PutObjectAsync(
                new PutObjectArgs()
                    .WithBucket(BucketName)
                    .WithObject(fileName)
                    .WithStreamData(file.OpenReadStream())
                    .WithObjectSize(file.Length)
                    .WithContentType(file.ContentType)
            );

            var variants = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
            if (IsImage(file.ContentType))
            {
                variants = await UploadImageVariants(file: file, baseObjectName: fileName);
            }

            return new StorageUploadResult(ObjectName: fileName, Variants: variants);
        }
        catch (Exception e)
        {
            throw new InvalidOperationException("File upload failed.", e);
        }
    }

    public IReadOnlyList<string> GetImageVariantNames()
    {
        return GetVariantConfigs().Select(x => x.Name).ToList();
    }

    public ImageDto BuildImageDto(string? baseObjectName)
    {
        if (string.IsNullOrWhiteSpace(baseObjectName))
        {
            return new ImageDto { Name = null, Variants = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase) };
        }

        var variants = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);
        foreach (var v in GetVariantConfigs())
        {
            variants[v.Name] = GetVariantObjectName(baseObjectName, v.Name);
        }

        return new ImageDto { Name = baseObjectName, Variants = variants };
    }

    public async Task EnsureImageVariants(string baseObjectName, bool overwrite = false)
    {
        if (string.IsNullOrWhiteSpace(baseObjectName))
        {
            return;
        }

        using var originalStream = new MemoryStream();

        await this.minioService.MinioClient.GetObjectAsync(
            new GetObjectArgs()
                .WithBucket(BucketName)
                .WithObject(baseObjectName)
                .WithCallbackStream(stream => stream.CopyTo(originalStream))
        );

        originalStream.Position = 0;
        using var image = await Image.LoadAsync<Rgba32>(originalStream);

        foreach (var v in GetVariantConfigs())
        {
            var objectName = GetVariantObjectName(baseObjectName, v.Name);

            if (!overwrite)
            {
                try
                {
                    await this.minioService.MinioClient.StatObjectAsync(
                        new StatObjectArgs()
                            .WithBucket(BucketName)
                            .WithObject(objectName)
                    );
                    continue;
                }
                catch
                {
                }
            }

            var contentType = string.IsNullOrWhiteSpace(v.ContentType) ? "image/jpeg" : v.ContentType;
            await UploadVariantJpeg(image: image, objectName: objectName, maxSize: v.MaxSize, maxBytes: v.MaxBytes, contentType: contentType);
        }
    }

    private static bool IsImage(string? contentType)
    {
        return !string.IsNullOrWhiteSpace(contentType) && contentType.StartsWith("image/", StringComparison.OrdinalIgnoreCase);
    }

    private sealed record ImageVariantConfig(string Name, int MaxSize, long MaxBytes, string? ContentType);

    private async Task<Dictionary<string, string>> UploadImageVariants(IFormFile file, string baseObjectName)
    {
        var variants = GetVariantConfigs();
        var uploaded = new Dictionary<string, string>(StringComparer.OrdinalIgnoreCase);

        await using var inputStream = file.OpenReadStream();
        using var image = await Image.LoadAsync<Rgba32>(inputStream);

        foreach (var v in variants)
        {
            var objectName = GetVariantObjectName(baseObjectName, v.Name);
            var contentType = string.IsNullOrWhiteSpace(v.ContentType) ? "image/jpeg" : v.ContentType;

            await UploadVariantJpeg(
                image: image,
                objectName: objectName,
                maxSize: v.MaxSize,
                maxBytes: v.MaxBytes,
                contentType: contentType);

            uploaded[v.Name] = objectName;
        }

        return uploaded;
    }

    private List<ImageVariantConfig> GetVariantConfigs()
    {
        var section = this.configuration.GetSection("ImageProcessing:Variants");
        if (section.Exists())
        {
            var fromConfig = section.Get<List<ImageVariantConfig>>() ?? new List<ImageVariantConfig>();
            var normalized = fromConfig
                .Where(v => v != null && !string.IsNullOrWhiteSpace(v.Name))
                .Select(v => v with
                {
                    MaxSize = v.MaxSize > 0 ? v.MaxSize : 256,
                    MaxBytes = v.MaxBytes > 0 ? v.MaxBytes : 10 * 1024,
                })
                .ToList();

            if (normalized.Count > 0)
            {
                return normalized;
            }
        }

        var thumbMaxBytes = this.configuration.GetValue<long?>("ImageProcessing:ThumbMaxBytes") ?? 10 * 1024;
        var displayMaxBytes = this.configuration.GetValue<long?>("ImageProcessing:DisplayMaxBytes") ?? 50 * 1024;
        var thumbMaxSize = this.configuration.GetValue<int?>("ImageProcessing:ThumbMaxSize") ?? 256;
        var displayMaxSize = this.configuration.GetValue<int?>("ImageProcessing:DisplayMaxSize") ?? 1280;

        return new List<ImageVariantConfig>
        {
            new(Name: "thumb", MaxSize: thumbMaxSize, MaxBytes: thumbMaxBytes, ContentType: "image/jpeg"),
            new(Name: "display", MaxSize: displayMaxSize, MaxBytes: displayMaxBytes, ContentType: "image/jpeg"),
        };
    }

    private async Task UploadVariantJpeg(Image<Rgba32> image, string objectName, int maxSize, long maxBytes, string contentType)
    {
        using var resized = ResizeToFit(image, maxSize);
        using var encoded = EncodeJpegToTargetBytes(resized, maxBytes);
        encoded.Position = 0;

        await this.minioService.MinioClient.PutObjectAsync(
            new PutObjectArgs()
                .WithBucket(BucketName)
                .WithObject(objectName)
                .WithStreamData(encoded)
                .WithObjectSize(encoded.Length)
                .WithContentType(contentType)
        );
    }

    private static Image<Rgba32> ResizeToFit(Image<Rgba32> original, int maxSize)
    {
        if (maxSize <= 0)
        {
            return original.Clone();
        }

        var width = original.Width;
        var height = original.Height;
        var longestSide = Math.Max(width, height);

        if (longestSide <= maxSize)
        {
            return original.Clone();
        }

        var ratio = (double)maxSize / longestSide;
        var targetWidth = (int)Math.Max(1, Math.Round(width * ratio));
        var targetHeight = (int)Math.Max(1, Math.Round(height * ratio));

        return original.Clone(ctx => ctx.Resize(new ResizeOptions
        {
            Size = new Size(targetWidth, targetHeight),
            Mode = ResizeMode.Max,
        }));
    }

    private static MemoryStream EncodeJpegToTargetBytes(Image<Rgba32> image, long maxBytes)
    {
        var minQuality = 35;
        var maxQuality = 85;
        var attemptQuality = maxQuality;
        MemoryStream? best = null;

        for (var i = 0; i < 8; i++)
        {
            var candidate = new MemoryStream();
            var encoder = new JpegEncoder
            {
                Quality = attemptQuality,
            };

            image.Save(candidate, encoder);
            if (candidate.Length <= maxBytes)
            {
                best?.Dispose();
                best = candidate;
                break;
            }

            best?.Dispose();
            best = candidate;
            maxQuality = attemptQuality - 1;
            attemptQuality = (minQuality + maxQuality) / 2;
            if (maxQuality < minQuality)
            {
                break;
            }
        }

        return best ?? new MemoryStream();
    }

    private static string GetVariantObjectName(string baseObjectName, string variantName)
    {
        return $"{baseObjectName}_{variantName}.jpg";
    }
}