import { ContextMenuService } from "@common/services/context-menu/ContextMenuService";
import { ContextMenu } from "@common/services/context-menu/ContextMenu";
import { inject, injectable } from "inversify";
import { LevelContextMenuId, LevelContextSubMenuId } from "@/modules/levels/model/common/constants";
import { ContextMenuServiceInjectKey } from "@common/services/context-menu/constants";
import ContextMenuItem from "@common/services/context-menu/ContextMenuItem";

@injectable()
class LevelCreateContextMenu {
  constructor(
    @inject(ContextMenuServiceInjectKey)
    private readonly contextMenu: ContextMenuService
  ) {
    this.contextMenu.registerContextMenu(
      new ContextMenu(LevelContextMenuId)
        .addItem(new ContextMenuItem('open', 'Open', () => {}, 'Icon.Open'))
        .addDivider()
        .addItem(new ContextMenuItem('open', 'Open', () => {}, 'Icon.Open'))
        .withSubMenu(
          new ContextMenu(LevelContextSubMenuId)
            .addItem(new ContextMenuItem('delete', 'Delete', () => {}, 'Icon.Delete', true))
            .addItem(new ContextMenuItem('copy', 'Copy', () => {}, 'Icon.Check'))
            .addItem(new ContextMenuItem('paste', 'Paste', () => {}, 'Icon.Paste'))
        )
        .addDivider()
        .addItem(new ContextMenuItem('name', 'Name', () => {}, 'Icon.Check'))
    )
    // this.contextMenu.showContextMenu(
    //   new Anchor('elementId'),
    //   new Position(),
    //   new EventHandler(ContextMenuEvents.onHide, handleHide)
    // )
  }
}

export default LevelCreateContextMenu;
