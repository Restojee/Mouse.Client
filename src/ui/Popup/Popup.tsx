import React from "react";
import { createPortal } from "react-dom";
import { AnchorAlign, type BoundaryOptions, PopupPosition } from "./usePopupPosition";
import { usePopup } from "@/hooks/usePopup";
import { StyledPopupContent, StyledPopupOverlay } from "@/ui/Popup/styled";
import { StyledBox } from "@/ui/Box";

interface PopupProps {
  header?: React.ReactElement;
  children: React.ReactElement;
  footer?: React.ReactElement;
  width?: number;
  height?: number;
  isVisible?: boolean;
  className?: string;
  onClose?: () => void;
  position?: PopupPosition | keyof typeof PopupPosition;
  anchor: React.ReactElement;
  closeOnScroll?: boolean;
  offset?: number;
  needOffset?: boolean;
  anchorAlign?: AnchorAlign;
  boundary?: BoundaryOptions;
  noPadding?: boolean;
  nonIntegration?: boolean;
  minWidth?: number;
}

export const Popup: React.FC<PopupProps> = (props) => {
  const {
    children,
    className,
    isVisible,
    position = PopupPosition.BOTTOM,
    anchor,
    onClose,
    offset,
    anchorAlign = AnchorAlign.CENTER,
    boundary,
    noPadding,
    minWidth,
  } = props;

  const { anchorRef, popupRef, popupPositionStyles, isRendered } = usePopup({
    isVisible: isVisible ?? false,
    onClose,
    position,
    offset,
    boundary,
    anchorAlign,
  });

  return (
    <>
      <StyledBox
        ref={anchorRef}
        style={{
          display: "contents",
        }}
      >
        {anchor}
      </StyledBox>
      {isVisible &&
        createPortal(
          <>
            <StyledPopupOverlay onClick={onClose} />
            <StyledPopupContent
              ref={popupRef}
              style={{
                left: popupPositionStyles?.left ?? 0,
                top: popupPositionStyles?.top ?? 0,
                opacity: isRendered ? 1 : 0,
                pointerEvents: isRendered ? "auto" : "none",
              }}
              minWidth={minWidth ?? 200}
              noPadding={noPadding}
              className={className}
            >
              {children}
            </StyledPopupContent>
          </>,
          document.body,
        )}
    </>
  );
};
