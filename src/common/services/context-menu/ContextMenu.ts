import { IContextMenu } from "@common/services/context-menu/IContextMenu";
import { ReactNode } from "react";
import { Callback } from "@common/types/common";

export class ContextMenu implements IContextMenu {
  private _items: IContextMenu[];

  constructor(public id: string) {}

  public getId(): string {
    return this.id;
  }

  public setId(id: string): void {
    this.id = id;
  }

  public render(): ReactNode {
      throw new Error("Method not implemented.");
  }

  public setItems(items: IContextMenu[]): this {
    this._items = items;
    return this;
  }

  public addItem(item: IContextMenu): this {
    this.setItems(this.getItems().concat(item));
    return this;
  }

  public getItems() {
    return this._items;
  }

  public addSubMenuWithCondition(condition: Callback<[], boolean>, menu: ContextMenu, ): this {
    if (condition) {
      this.addSubMenu(menu);
    }
    return this;
  }

  public addSubMenu(menu: ContextMenu): this {
    this.addItem(menu);
    return this;
  }
}
