import { IContextMenu } from "@common/services/context-menu/IContextMenu";
import { ReactNode } from "react";
import { Callback } from "@common/types/common";
import { bool } from "yup";

class ContextMenuItem implements IContextMenu {

    private divider: boolean;

    render(): ReactNode {
        throw new Error("Method not implemented.");
    }
    constructor(
      public id: string,
      public label: string,
      public action: Callback,
      public icon?: string,
      public disabled?: boolean,
    ) {}

    public setIcon(icon: string): void {
        this.icon = icon;
    }

    public setDisabled(disabled: boolean): void {
        this.disabled = disabled;
    }

    public setDivider(divider: boolean): void {
        this.divider = divider;
    }

    public withDivider(): this {
        this.setDivider(true);
        return this;
    }

    public withIcon(icon: string): this {
        this.icon = icon;
        return this;
    }

    public withDisabled(disabled: boolean): this {
        this.setDisabled(disabled);
        return this;
    }
}

export default ContextMenuItem;
