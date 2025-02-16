import { ContextMenuEntity } from "@common/services/context-menu/ContextMenuEntity";
import { ContextMenuDataAccess } from "@common/services/context-menu/ContextMenuDataAccess";

// this._contextMenuService.create(ExampleOptionsContextMenu)
// this._contextMenuService.open(ExampleOptionsContextMenu)
// const Wrapper = this._contextMenuService.bind(ExampleOptionsContextMenu)
//   <ContextMenu>
//      <Dashboard />
//   </ContextMenu>

export class ContextMenuService {
  private readonly _contextMenuDataAccess: ContextMenuDataAccess;

  public registerContextMenu(contextMenu: ContextMenuEntity) {
    this._contextMenuDataAccess.registerContextMenu(contextMenu);
  }

  public unregisterContextMenu(contextMenu: ContextMenuEntity) {
    this._contextMenuDataAccess.unregisterContextMenu(contextMenu.id);
  }
}