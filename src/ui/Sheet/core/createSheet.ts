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

const splitProps = (props: object) => {
  const serializableProps: Record<string, unknown> = {};
  const volatileProps: Record<string, unknown> = {};

  Object.entries(props).forEach(([key, value]) => {
    if (typeof value === "function") {
      volatileProps[key] = value;
      return;
    }

    serializableProps[key] = value;
  });

  return { serializableProps, volatileProps };
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
        const { serializableProps, volatileProps } = splitProps((props ?? {}) as object);

        _lastId = id;
        sheetData.setResolve(id, resolve as (value: unknown) => void);
        sheetData.setVolatileProps(id, volatileProps);
        sheetData.dispatch(
          pushSheet({
            id,
            kind,
            props: serializableProps,
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
