import EntityManager from "@common/store/entity/EntityManager";
import { ContextMenuEntity } from "@common/services/context-menu/ContextMenuEntity";

export class ContextMenuDataAccess {
  private readonly _contextMenuEntityManager: EntityManager<ContextMenuEntity>;
  private getContextMenuEntityManager(): EntityManager<ContextMenuEntity>{
    return this._contextMenuEntityManager;
  };

  public registerContextMenu(contextMenuEntity: ContextMenuEntity) {
    this.getContextMenuEntityManager().create(contextMenuEntity);
  }

  public unregisterContextMenu(id: string) {
    this.getContextMenuEntityManager().remove(id);
  }
}