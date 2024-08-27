import { ReactNode } from "react";
import { createPortal } from "react-dom";

type Props = {
  children: ReactNode;
  isVisible: boolean;
  container: Element;
};
export const Portal = (props: Partial<Props>) => {
  const { isVisible = true, container, children } = props;

  if (isVisible && container) {
    return createPortal(children, container);
  }

  return null;
};
