import { SheetKind } from "./sheetKind";
import { SheetComponent } from "./types";

const _registry = new Map<SheetKind, SheetComponent>();

export const sheetRegistry = {
  register(kind: SheetKind, component: SheetComponent): void {
    _registry.set(kind, component);
  },
  get(kind: SheetKind): SheetComponent | undefined {
    return _registry.get(kind);
  },
};
