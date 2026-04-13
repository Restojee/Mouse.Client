import React, { ReactNode } from "react";
import { sheetData } from "./core/sheetData";
import { SheetConfig } from "./core/types";

export type SheetHandle = {
  close: () => void;
};

export type ShowSheetOptions = SheetConfig & {
  onClose?: () => void;
  onAccess?: () => void;
};

type ContentProps = { children: ReactNode };
const ContentWrapper = ({ children }: ContentProps) => children as React.ReactElement | null;

export const sheetService = {
  show(content: ReactNode, options: ShowSheetOptions = {}): SheetHandle {
    const { onClose, onAccess, ...config } = options;
    const id = sheetData.nextId();

    sheetData.push({
      id,
      component: ContentWrapper as React.ComponentType<ContentProps & { onClose: (result?: unknown) => void }>,
      props: { children: content },
      config,
      resolve: (result) => {
        if (result === true) {
          onAccess?.();
        } else {
          onClose?.();
        }
      },
    });

    return {
      close: () => {
        sheetData.remove(id);
        onClose?.();
      },
    };
  },
};
