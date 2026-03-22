using System.Collections.Generic;
using Microsoft.AspNetCore.Http;
using System.Threading.Tasks;
using Mouse.NET.Storage.Models;

namespace Mouse.NET.Storage;

public interface IStorageService
{
    public Task<string> Upload(IFormFile file);

    public Task<StorageUploadResult> UploadWithVariants(IFormFile file);

    public IReadOnlyList<string> GetImageVariantNames();

    public ImageDto BuildImageDto(string? baseObjectName);

    public Task EnsureImageVariants(string baseObjectName, bool overwrite = false);
}

public sealed record StorageUploadResult(
    string ObjectName,
    IReadOnlyDictionary<string, string> Variants
);