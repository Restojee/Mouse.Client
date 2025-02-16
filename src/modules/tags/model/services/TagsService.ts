import { ContextMenuService } from "@common/services/context-menu/ContextMenuService";

export class TagsService {

  private _tagsService: TagsService;
  private _contextMenuService: ContextMenuService;

  constructor(tagsService: TagsService, contextMenuService: ContextMenuService) {
    this._tagsService = tagsService;
    this._contextMenuService = contextMenuService;
  }
}