import { ComponentType } from "react";
import { SheetKind } from "./sheetKind";
import { SheetComponent, SheetConfig } from "./types";
import { pushSheet } from "../slice";
import { sheetData } from "./sheetData";
import { sheetRegistry } from "./sheetRegistry";

export type SheetComponentProps<TResult = void> = {
  onClose: (result?: TResult) => void;
};

export type SheetCreator<TProps extends object, TResult> = {
  kind: SheetKind;
  show(props?: TProps, config?: Partial<SheetConfig>): Promise<TResult | undefined>;
  close(): void;
};

export function createSheet<TProps extends object = object, TResult = void>(
  component: ComponentType<TProps & SheetComponentProps<TResult>>,
  kind: SheetKind,
  defaultConfig?: Partial<SheetConfig>,
): SheetCreator<TProps, TResult> {
  sheetRegistry.register(kind, component as SheetComponent);
  let _lastId: string | null = null;

  return {
    kind,
    show(props?: TProps, config?: Partial<SheetConfig>): Promise<TResult | undefined> {
      return new Promise<TResult | undefined>((resolve) => {
        const id = sheetData.nextId();
        _lastId = id;
        sheetData.setResolve(id, resolve as (value: unknown) => void);
        sheetData.dispatch(
          pushSheet({
            id,
            kind,
            props: (props ?? {}) as object,
            config: { ...defaultConfig, ...config } as SheetConfig,
          }),
        );
      });
    },

    close(): void {
      if (!_lastId) return;
      const id = _lastId;
      _lastId = null;
      sheetData.remove(id, undefined);
    },
  };
}
