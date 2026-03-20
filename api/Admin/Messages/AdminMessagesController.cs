using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Mouse.NET.Common;
using Mouse.NET.Messages.Models;
using Mouse.NET.Messages.services;

namespace Mouse.NET.Admin.Messages;

[ApiController]
[Route("admin/messages")]
[Authorize(Policy = nameof(OtherPolicy.Administration))]
public class AdminMessagesController : ControllerBase
{
    private readonly IMessageService messageService;

    public AdminMessagesController(IMessageService messageService)
    {
        this.messageService = messageService;
    }

    [HttpPost("create")]
    [Authorize(Policy = nameof(Policy.MessagesCreate))]
    public async Task<Message> Create([FromBody] MessageCreateRequest createRequest)
    {
        return await this.messageService.CreateMessage(createRequest);
    }

    [HttpPut("update")]
    [Authorize(Policy = nameof(Policy.MessagesEdit))]
    public async Task<Message> Update([FromBody] MessageUpdateRequest updateRequest)
    {
        return await this.messageService.UpdateMessage(updateRequest);
    }

    [HttpDelete("remove/{messageId}")]
    [Authorize(Policy = nameof(Policy.MessagesDelete))]
    public async Task<string> Delete([FromRoute] int messageId)
    {
        return await this.messageService.DeleteMessage(messageId);
    }
}
