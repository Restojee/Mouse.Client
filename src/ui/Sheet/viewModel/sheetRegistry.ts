import { ReactNode } from "react";

type SheetRegistryEntry = {
  content: ReactNode;
  onClose?: () => void;
  onAccess?: () => void;
};

/** Реестр несериализуемых данных sheet'ов (ReactNode, callbacks). Хранится вне Redux. */
const registry = new Map<string, SheetRegistryEntry>();

export const sheetRegistry = {
  set(id: string, entry: SheetRegistryEntry) {
    registry.set(id, entry);
  },
  get(id: string) {
    return registry.get(id);
  },
  remove(id: string) {
    const entry = registry.get(id);
    registry.delete(id);
    return entry;
  },
  clear() {
    const entries = Array.from(registry.values());
    registry.clear();
    return entries;
  },
};
