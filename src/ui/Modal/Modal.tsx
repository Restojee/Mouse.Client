import { Property } from "csstype";
import { ReactNode } from "react";
import { AsyncSheet } from "@/ui/Sheet/view";

/**
 * @deprecated Используй useSheet().show() для императивного открытия.
 * Или <AsyncSheet> для декларативного. Этот компонент — обёртка для обратной совместимости.
 */
export type ModalPropsType = {
  isOpen?: boolean;
  onClose: () => void;
  onAccess?: () => void;
  accessDisabled?: boolean;
  text?: string;
  title?: string;
  width?: Property.Width<number>;
  children?: ReactNode;
  withoutTitle?: boolean;
  withoutButtons?: boolean;
  autoHeight?: boolean;
};

/** @deprecated Используй <AsyncSheet> или useSheet().show() */
export const Modal = ({ isOpen, ...props }: ModalPropsType) => {
  return (
    <AsyncSheet
      isOpen={isOpen ?? false}
      {...props}
    />
  );
};
