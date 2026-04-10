import React from "react";
import { createPortal } from "react-dom";
import { AnchorAlign, type BoundaryOptions, PopupPosition } from "./usePopupPosition";
import { usePopup } from "@/hooks/usePopup";
import popupStyles from "./Popup.module.scss";

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
  transformOrigin?: string;
  borderRadius?: string;
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
    transformOrigin,
    borderRadius,
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
      <div
        ref={anchorRef}
        style={{ display: "contents" }}
      >
        {anchor}
      </div>
      {isVisible &&
        createPortal(
          <>
            <div className={popupStyles.overlay} onClick={onClose} />
            <div
              ref={popupRef}
              className={[popupStyles.popupContent, className].filter(Boolean).join(" ")}
              style={{
                left: popupPositionStyles?.left ?? 0,
                top: popupPositionStyles?.top ?? 0,
                opacity: isRendered ? 1 : 0,
                transform: isRendered ? "scale(1)" : "scale(0.9)",
                pointerEvents: isRendered ? "auto" : "none",
                transformOrigin: transformOrigin ?? "center",
                minWidth: minWidth ?? 200,
                borderRadius: borderRadius ?? "var(--site-border, 15px)",
                padding: noPadding ? 0 : "8px",
              }}
            >
              {children}
            </div>
          </>,
          document.body,
        )}
    </>
  );
};
