import { useCallback } from "react";
import { ReactNode } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { pushSheet, removeSheet, clearSheets, selectSheetStack } from "../slice";
import { sheetRegistry } from "./sheetRegistry";
import { SheetHandle, ShowSheetOptions } from "../model/types";

let _nextId = 0;

/**
 * Хук для императивного управления sheet'ами.
 * Сериализуемые данные (config) — в Redux store.
 * Несериализуемые (ReactNode, callbacks) — в sheetRegistry.
 *
 * @example
 * const sheet = useSheet();
 * const handle = sheet.show(<MyContent />, { title: "Заголовок" });
 * handle.close();
 */
export const useSheet = () => {
  const dispatch = useAppDispatch();
  const stack = useAppSelector(selectSheetStack);

  const close = useCallback(
    (id: string) => {
      const entry = sheetRegistry.remove(id);
      entry?.onClose?.();
      dispatch(removeSheet(id));
    },
    [dispatch],
  );

  const closeTop = useCallback(() => {
    const top = stack[stack.length - 1];
    if (top) close(top.id);
  }, [stack, close]);

  const closeAll = useCallback(() => {
    const entries = sheetRegistry.clear();
    entries.forEach((e) => e.onClose?.());
    dispatch(clearSheets());
  }, [dispatch]);

  const show = useCallback(
    (content: ReactNode, options: ShowSheetOptions = {}): SheetHandle => {
      const id = `sheet-${++_nextId}`;
      const { onClose: onCloseCallback, onAccess, ...config } = options;

      sheetRegistry.set(id, { content, onClose: onCloseCallback, onAccess });
      dispatch(pushSheet({ id, config }));

      return {
        close: () => close(id),
      };
    },
    [dispatch, close],
  );

  return { stack, show, close, closeTop, closeAll };
};
