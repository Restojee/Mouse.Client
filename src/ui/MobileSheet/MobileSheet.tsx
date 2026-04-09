import * as React from "react";
import styled from "styled-components";
import { ModalCloseIcon } from "@/ui/ModalCloseIcon/ModalCloseIcon";
import { useAppTheme } from "@/hooks/useAppTheme";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  zIndex?: number;
  height?: string;
  noHeader?: boolean;
  bgColor?: string;
};

const Overlay = styled.div<{ isOpen: boolean; zIndex: number }>(({ isOpen, zIndex }) => ({
  position: "fixed",
  inset: 0,
  zIndex,
  display: "flex",
  alignItems: "flex-end",
  pointerEvents: isOpen ? "auto" : "none",
}));

const Backdrop = styled.div<{ isOpen: boolean }>(({ isOpen }) => ({
  position: "absolute",
  inset: 0,
  backgroundColor: "rgba(0,0,0,0.5)",
  opacity: isOpen ? 1 : 0,
  transition: "opacity 0.3s",
}));

const Sheet = styled.div<{
  isOpen: boolean;
  height: string;
  isDragging: boolean;
  dragOffset: number;
  bgColor?: string;
}>(({ theme, isOpen, height, isDragging, dragOffset, bgColor }) => ({
  position: "relative",
  width: "100%",
  height,
  backgroundColor: bgColor ?? theme.colors.secondary,
  borderRadius: "20px 20px 0 0",
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
  transform: isOpen ? `translateY(${dragOffset}px)` : "translateY(100%)",
  transition: isDragging ? "none" : "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
  boxShadow: "0 -4px 24px rgba(0,0,0,0.2)",
}));

// eslint-disable-next-line no-empty-pattern
const HandleBar = styled.div({
  flexShrink: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 28,
  cursor: "ns-resize",
  touchAction: "none",
  userSelect: "none",
});

const HandleBarPill = styled.div(({ theme }) => ({
  width: 40,
  height: 4,
  borderRadius: 2,
  backgroundColor: theme.colors.input.border,
}));

const SheetHeader = styled.div({
  flexShrink: 0,
  minHeight: 48,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 8px 0 16px",
});

const SheetTitle = styled.div(({ theme }) => ({
  fontSize: "16px",
  fontWeight: 600,
  color: theme.colors.textOnSecondary,
}));

const SheetBody = styled.div({
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  minHeight: 0,
  overflow: "auto",
});

const MIN_HEIGHT_PX = 120;
const MAX_HEIGHT_VH = 92;
const CLOSE_THRESHOLD_RATIO = 0.3;

export const MobileSheet: React.FC<Props> = ({
  isOpen,
  onClose,
  children,
  title,
  zIndex = 500,
  height = "90dvh",
  noHeader = false,
  bgColor,
}) => {
  const { theme } = useAppTheme();
  const sheetRef = React.useRef<HTMLDivElement>(null);
  const [sheetHeight, setSheetHeight] = React.useState<number | null>(null);
  const [dragOffset, setDragOffset] = React.useState(0);
  const [isDragging, setIsDragging] = React.useState(false);
  const dragStartY = React.useRef(0);
  const dragStartHeight = React.useRef(0);

  const getMaxHeight = () => Math.floor((window.innerHeight * MAX_HEIGHT_VH) / 100);

  const onPointerDown = React.useCallback((e: React.PointerEvent) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    dragStartY.current = e.clientY;
    dragStartHeight.current = sheetRef.current?.offsetHeight ?? 0;
    setIsDragging(true);
    setDragOffset(0);
  }, []);

  const onPointerMove = React.useCallback(
    (e: React.PointerEvent) => {
      if (!isDragging) return;
      const delta = dragStartY.current - e.clientY;

      if (delta < 0) {
        // dragging down — shift sheet visually, no resize
        setDragOffset(Math.abs(delta));
        setSheetHeight(dragStartHeight.current);
      } else {
        // dragging up — resize taller
        setDragOffset(0);
        const next = Math.min(getMaxHeight(), Math.max(MIN_HEIGHT_PX, dragStartHeight.current + delta));
        setSheetHeight(next);
      }
    },
    [isDragging],
  );

  const onPointerUp = React.useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const closeThreshold = (sheetRef.current?.offsetHeight ?? 300) * CLOSE_THRESHOLD_RATIO;
    if (dragOffset >= closeThreshold) {
      setDragOffset(0);
      setSheetHeight(null);
      onClose();
    } else {
      setDragOffset(0);
    }
  }, [isDragging, dragOffset, onClose]);

  // reset height when closed
  React.useEffect(() => {
    if (!isOpen) {
      setSheetHeight(null);
      setDragOffset(0);
    }
  }, [isOpen]);

  const resolvedHeight = sheetHeight !== null ? `${sheetHeight}px` : height;

  return (
    <Overlay
      isOpen={isOpen}
      zIndex={zIndex}
    >
      <Backdrop
        isOpen={isOpen}
        onClick={onClose}
      />
      <Sheet
        ref={sheetRef}
        isOpen={isOpen}
        height={resolvedHeight}
        isDragging={isDragging}
        dragOffset={dragOffset}
        bgColor={bgColor}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
      >
        <HandleBar onPointerDown={onPointerDown}>
          <HandleBarPill />
        </HandleBar>
        {!noHeader && (
          <SheetHeader>
            <SheetTitle>{title}</SheetTitle>
            <ModalCloseIcon
              color={theme.colors.textOnSecondary}
              onClick={onClose}
            />
          </SheetHeader>
        )}
        <SheetBody>{children}</SheetBody>
      </Sheet>
    </Overlay>
  );
};
