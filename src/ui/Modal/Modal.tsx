import { Property } from "csstype";
import { ReactNode, Suspense } from "react";
import { AsyncModalContent } from "./AsyncModalContent";

export type ModalPropsType = {
  isOpen?: boolean;
  onClose: () => void;
  onAccess?: () => void;
  text?: string;
  title?: string;
  width?: Property.Width<number>;
  children?: ReactNode;
  withoutTitle?: boolean;
  withoutButtons?: boolean;
};
export const Modal = ({ isOpen, ...props }: ModalPropsType) => {
  if (!isOpen) {
    return null;
  }

  return (
    <Suspense>
      <AsyncModalContent {...props} />
    </Suspense>
  );
};
