import { ComponentType } from "react";
import { SheetConfig } from "./types";
import { pushSheet, removeSheet, clearSheets } from "../slice";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AnySheetInstance = SheetInstance<any, any>;

export type SheetInstance<TProps, TResult> = {
  id: string;
  component: ComponentType<TProps & { onClose: (result?: TResult) => void }>;
  props: TProps;
  config: SheetConfig;
  resolve: (value: TResult | undefined) => void;
};

type RegistryEntry = {
  component: ComponentType<{ onClose: (result?: unknown) => void }>;
  props: object;
  resolve: (value: unknown) => void;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type AppDispatch = (action: any) => void;

let _dispatch: AppDispatch | null = null;
let _nextId = 0;

const _registry = new Map<string, RegistryEntry>();

export const sheetData = {
  init(dispatch: AppDispatch) {
    _dispatch = dispatch;
  },

  nextId(): string {
    return `sheet-${++_nextId}`;
  },

  push(instance: AnySheetInstance): void {
    if (!_dispatch) return;
    _registry.set(instance.id, {
      component: instance.component,
      props: instance.props,
      resolve: instance.resolve,
    });
    _dispatch(pushSheet({ id: instance.id, config: instance.config }));
  },

  remove(id: string): void {
    if (!_dispatch) return;
    _registry.delete(id);
    _dispatch(removeSheet(id));
  },

  removeAll(): void {
    if (!_dispatch) return;
    _registry.clear();
    _dispatch(clearSheets());
  },

  getEntry(id: string): RegistryEntry | undefined {
    return _registry.get(id);
  },
};
