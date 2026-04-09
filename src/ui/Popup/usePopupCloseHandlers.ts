import { useOutsideClick } from "@/ui/Popup/useOutsideClick";
import { RefObject } from "react";

interface UsePopupCloseHandlersOptions {
  refs: RefObject<HTMLElement>[];
  onClose?: () => void;
  isVisible: boolean;
  closeOnScroll?: boolean;
  checkAdditionalElements?: (target: Node) => boolean;
}

export const usePopupCloseHandlers = ({
  refs,
  onClose,
  isVisible,
  closeOnScroll,
  checkAdditionalElements,
}: UsePopupCloseHandlersOptions) => {
  useOutsideClick(refs, onClose, isVisible, checkAdditionalElements, closeOnScroll);
};
