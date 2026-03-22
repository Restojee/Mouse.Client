using AutoMapper;
using System.Net;
using Mouse.NET.Common;
using Mouse.NET.Common.Services;
using Mouse.NET.Data.Models;
using Mouse.NET.Messages.Data;
using Mouse.NET.Messages.Models;
using Mouse.Stick.Controllers.Auth;

namespace Mouse.NET.Messages.services;

public class MessageService : IMessageService
{
    
    private readonly IMapper mapper;
    private readonly IAuthService authService;
    private readonly IMessageRepository messageRepository;
    private readonly IOwnershipService ownershipService;

    public MessageService(IMapper mapper, IMessageRepository messageRepository, IAuthService authService, IOwnershipService ownershipService) {
        this.messageRepository = messageRepository;
        this.mapper = mapper;
        this.authService = authService;
        this.ownershipService = ownershipService;
    }
    
    public async Task<PagedResult<Message>> GetMessageCollection(PaginateRequest request)
    {
        return mapper.Map<PagedResult<MessageEntity>, PagedResult<Message>>(await this.messageRepository.GetMessageCollection(request));
    }

    public async Task<Message> GetMessage(int messageId)
    {
        return mapper.Map<MessageEntity, Message>(await this.messageRepository.GetMessage(messageId));
    }

    public async Task<Message> CreateMessage(MessageCreateRequest request)
    {
        var message = mapper.Map<MessageCreateRequest, MessageEntity>(request);
        message.UserId = this.authService.GetAuthorizedUserId().GetValueOrDefault();
        return mapper.Map<MessageEntity, Message>(await this.messageRepository.CreateMessage(message));
    }

    public async Task<Message> UpdateMessage(MessageUpdateRequest request)
    {
        var messageExists = await this.messageRepository.GetMessage(request.Id);
        if (messageExists == null)
        {
            throw new ApiNotFoundException(
                name: "MessageNotFound",
                messages: new[] { "Запрашиваемый сообщение не найден" });
        }
        this.ownershipService.EnsureCanEdit(messageExists.UserId, "сообщение", nameof(Policy.MessagesEditSelf));
        return mapper.Map<MessageEntity, Message>(await this.messageRepository.UpdateMessage(mapper.Map(request, messageExists)));
    }

    public async Task<string> DeleteMessage(int messageId)
    {
        var messageExists = await this.messageRepository.GetMessage(messageId);
        if (messageExists == null)
        {
            throw new ApiNotFoundException(
                name: "MessageNotFound",
                messages: new[] { "Запрашиваемое сообщение не найден" });
        }

        this.ownershipService.EnsureCanDelete(messageExists.UserId, "сообщение", nameof(Policy.MessagesDeleteSelf));
        await this.messageRepository.DeleteMessage(messageExists);
        return "Ok";
    }
}