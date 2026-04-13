import { ComponentType } from "react";
import { SheetConfig } from "./types";
import { sheetData } from "./sheetData";

export type SheetComponentProps<TResult = void> = {
  onClose: (result?: TResult) => void;
};

export type SheetCreator<TProps extends object, TResult> = {
  show(props?: TProps, config?: Partial<SheetConfig>): Promise<TResult | undefined>;
  close(): void;
};

export function createSheet<TProps extends object = object, TResult = void>(
  component: ComponentType<TProps & SheetComponentProps<TResult>>,
  defaultConfig?: Partial<SheetConfig>,
): SheetCreator<TProps, TResult> {
  let _lastId: string | null = null;

  return {
    show(props?: TProps, config?: Partial<SheetConfig>): Promise<TResult | undefined> {
      return new Promise<TResult | undefined>((resolve) => {
        const id = sheetData.nextId();
        _lastId = id;
        sheetData.push({
          id,
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          component: component as ComponentType<any>,
          props: props ?? {},
          config: { ...defaultConfig, ...config },
          resolve,
        });
      });
    },

    close(): void {
      if (!_lastId) return;
      const id = _lastId;
      _lastId = null;
      const entry = sheetData.getEntry(id);
      if (entry) {
        entry.resolve(undefined);
        sheetData.remove(id);
      }
    },
  };
}
