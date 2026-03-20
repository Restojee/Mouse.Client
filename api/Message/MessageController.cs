using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
using Mouse.NET.Common;
using Mouse.NET.Messages.Models;
using Mouse.NET.Messages.services;

namespace Mouse.NET.Messages;

[ApiController]
[Route("messages")]
public class MessageController : ControllerBase
{
    
    private readonly IMessageService messageService;

    public MessageController(IMessageService messageService)
    {
        this.messageService = messageService;
    }

    [HttpGet("collect")]
    public async Task<PagedResult<Message>> GetMessageCollection([FromQuery] PaginateRequest request)
    {
        return await this.messageService.GetMessageCollection(request);
    }

    [HttpGet("by-one/{messageId}")]
    public async Task<Message> GetMessage([FromRoute] int messageId)
    {
        return await this.messageService.GetMessage(messageId);
    }
}