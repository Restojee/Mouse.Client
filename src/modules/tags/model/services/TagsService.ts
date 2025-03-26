import { ContextMenuService } from "@common/services/context-menu/ContextMenuService";

export class TagsService {

  constructor(
    private tagsService: TagsService,
    private contextMenuService: ContextMenuService
  ) {}
}
