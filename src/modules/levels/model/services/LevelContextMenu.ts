import { ContextMenuService } from "@common/services/context-menu/ContextMenuService";
import { ContextMenu } from "@common/services/context-menu/ContextMenu";
import { inject, injectable } from "inversify";
import { LevelContextMenuId, LevelContextSubMenuId } from "@/modules/levels/model/common/constants";
import { ContextMenuServiceInjectKey } from "@common/services/context-menu/constants";
import ContextMenuItem from "@common/services/context-menu/ContextMenuItem";

const isUserHasAccessToEdit = () => true;

@injectable()
class LevelCreateContextMenu {
  constructor(
    @inject(ContextMenuServiceInjectKey)
    private readonly contextMenu: ContextMenuService
  ) {
    const levelContextMenu = new ContextMenu(LevelContextMenuId)
      .addItem(new ContextMenuItem('open', 'Open', () => {}, 'Icon.Open'))
      levelContextMenu.addSubMenuWithCondition(
        isUserHasAccessToEdit,
        new ContextMenu(LevelContextSubMenuId)
          .addItem(
            new ContextMenuItem('delete', 'Delete', () => {}, 'Icon.Delete')
              .withDisabled(true)
              .withDivider()
          )
          .addItem(new ContextMenuItem('copy', 'Copy', () => {}, 'Icon.Check'))
          .addItem(new ContextMenuItem('paste', 'Paste', () => {}, 'Icon.Paste')),
      )
      levelContextMenu.addItem(
        new ContextMenuItem('name', 'Name', () => {})
          .withIcon('Icon.Check')
      );

    this.contextMenu.registerContextMenu(levelContextMenu)
    // this.contextMenu.showContextMenu(
    //   new Anchor('elementId'),
    //   new Position(),
    //   new EventHandler(ContextMenuEvents.onHide, handleHide)
    // )
  }
}

export default LevelCreateContextMenu;
