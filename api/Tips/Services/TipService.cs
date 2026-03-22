using AutoMapper;
using Mouse.NET.Common;
using Mouse.NET.Common.Services;
using Mouse.NET.Data.Models;
using Mouse.NET.Tags.Data;
using Mouse.NET.Tips.Data;
using Mouse.NET.Tips.Models;
using Mouse.Stick.Controllers.Auth;
using System.Net;

namespace Mouse.NET.Tips.services;

public class TipService : ITipService
{

    private readonly IMapper mapper;
    private readonly IAuthService authService;
    private readonly ITipRepository tipRepository;
    private readonly IOwnershipService ownershipService;

    public TipService(IMapper mapper, ITipRepository tipRepository, IAuthService authService, IOwnershipService ownershipService)
    {
        this.tipRepository = tipRepository;
        this.authService = authService;
        this.mapper = mapper;
        this.ownershipService = ownershipService;
    }
    
    public async Task<PagedResult<Tip>> GetTipCollection(PaginateRequest request)
    {
        return mapper.Map<PagedResult<TipEntity>, PagedResult<Tip>>(await this.tipRepository.GetTipCollection(request));
    }

    public async Task<Tip> GetTip(int tipId)
    {
        return mapper.Map<TipEntity, Tip>(await this.tipRepository.GetTip(tipId));
    }

    public async Task<Tip> CreateTip(TipCreateRequest request)
    {
        return mapper.Map<TipEntity, Tip>(await this.tipRepository.CreateTip(new TipEntity
        {
            UserId = this.authService.GetAuthorizedUserId().GetValueOrDefault(),
            Title = request.Title,
            Text = request.Text,
        }));
    }

    public async Task<Tip> UpdateOwnTip(TipUpdateRequest request)
    {
        var tipExists = await this.tipRepository.GetTip(request.Id);
        if (tipExists == null)
        {
            throw new ApiNotFoundException(
                name: "TipNotFound",
                messages: new[] { "Запрашиваемая информация не найдена" });
        }
        return mapper.Map<TipEntity, Tip>(await this.tipRepository.UpdateTip(mapper.Map(request, tipExists)));
    }
    
    public async Task<Tip> UpdateTip(TipUpdateRequest request)
    {
        var tipExists = await this.tipRepository.GetTip(request.Id);
        if (tipExists == null)
        {
            throw new ApiNotFoundException(
                name: "TipNotFound",
                messages: new[] { "Запрашиваемая информация не найдена" });
        }
        this.ownershipService.EnsureCanEdit(tipExists.User?.Id, "подсказка", nameof(Policy.TipsEditSelf));
        return mapper.Map<TipEntity, Tip>(await this.tipRepository.UpdateTip(mapper.Map(request, tipExists)));
    }

    public async Task<string> DeleteTip(int tipId)
    {
        var tipExists = await this.tipRepository.GetTip(tipId);
        if (tipExists == null)
        {
            throw new ApiNotFoundException(
                name: "TipNotFound",
                messages: new[] { "Запрашиваемая информация не найдена" });
        }
        this.ownershipService.EnsureCanDelete(tipExists.User?.Id, "подсказка", nameof(Policy.TipsDeleteSelf));
        await this.tipRepository.DeleteTip(tipExists);
        return "Ok";
    }

    public async Task<string> DeleteTipAdmin(int tipId)
    {
        var tipExists = await this.tipRepository.GetTip(tipId);
        if (tipExists == null)
        {
            throw new ApiNotFoundException(
                name: "TipNotFound",
                messages: new[] { "Запрашиваемая информация не найдена" });
        }
        await this.tipRepository.DeleteTip(tipExists);
        return "Ok";
    }
}