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

const Sheet = styled.div<{ isOpen: boolean; height: string; bgColor?: string }>(
  ({ theme, isOpen, height, bgColor }) => ({
    position: "relative",
    width: "100%",
    height,
    maxHeight: "90dvh",
    backgroundColor: bgColor ?? theme.colors.secondary,
    color: theme.colors.textOnSecondary,
    borderRadius: "25px 25px 0 0",
    display: "flex",
    flexDirection: "column",
    overflow: "hidden",
    transform: isOpen ? "translateY(0)" : "translateY(100%)",
    transition: "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)",
    boxShadow: "0 -4px 24px rgba(0,0,0,0.2)",
    willChange: "transform",
  }),
);

const HandleBar = styled.div({
  flexShrink: 0,
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: 32,
  cursor: "ns-resize",
  userSelect: "none",
  touchAction: "none",
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
  overflowY: "auto",
  overflowX: "hidden",
  WebkitOverflowScrolling: "touch",
});

const CLOSE_THRESHOLD_RATIO = 0.25;
const VELOCITY_THRESHOLD = 0.5;
const LOCK_THRESHOLD_PX = 6;

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
  const bodyRef = React.useRef<HTMLDivElement>(null);
  const onCloseRef = React.useRef(onClose);
  onCloseRef.current = onClose;

  const drag = React.useRef({
    active: false,
    intent: null as "drag" | "scroll" | null,
    startX: 0,
    startY: 0,
    lastY: 0,
    lastTime: 0,
    velocity: 0,
    offset: 0,
  });

  const applyTransform = (offset: number, animated: boolean) => {
    const el = sheetRef.current;
    if (!el) return;
    el.style.transition = animated ? "transform 0.35s cubic-bezier(0.32, 0.72, 0, 1)" : "none";
    el.style.transform = `translateY(${Math.max(0, offset)}px)`;
    drag.current.offset = offset;
  };

  const settle = React.useCallback((close: boolean) => {
    applyTransform(0, true);
    if (close) {
      onCloseRef.current();
    }
  }, []);

  // Attach non-passive touch listeners so we can call preventDefault
  React.useEffect(() => {
    const sheet = sheetRef.current;
    if (!sheet) return;

    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length !== 1) return;
      const t = e.touches[0];
      const d = drag.current;
      d.active = true;
      d.intent = null;
      d.startX = t.clientX;
      d.startY = t.clientY;
      d.lastY = t.clientY;
      d.lastTime = e.timeStamp;
      d.velocity = 0;
      d.offset = 0;
    };

    const onTouchMove = (e: TouchEvent) => {
      const d = drag.current;
      if (!d.active) return;
      if (e.touches.length !== 1) return;

      const t = e.touches[0];
      const dy = t.clientY - d.startY;
      const dx = t.clientX - d.startX;
      const absDy = Math.abs(dy);
      const absDx = Math.abs(dx);

      // Determine intent once threshold exceeded
      if (d.intent === null) {
        if (absDy < LOCK_THRESHOLD_PX && absDx < LOCK_THRESHOLD_PX) return;
        // Horizontal swipe → let browser handle
        if (absDx > absDy) {
          d.intent = "scroll";
          d.active = false;
          return;
        }
        const scrollTop = bodyRef.current?.scrollTop ?? 0;
        if (dy > 0 && scrollTop <= 0) {
          // Downward at top → take over as sheet drag
          d.intent = "drag";
        } else if (dy < 0 || scrollTop > 0) {
          // Upward or content is scrolled → let scroll happen
          d.intent = "scroll";
          d.active = false;
          return;
        } else {
          d.intent = "scroll";
          d.active = false;
          return;
        }
      }

      if (d.intent !== "drag") return;

      // Block native scroll and browser gestures
      e.preventDefault();

      // Velocity
      const dt = e.timeStamp - d.lastTime;
      if (dt > 0) d.velocity = (t.clientY - d.lastY) / dt;
      d.lastY = t.clientY;
      d.lastTime = e.timeStamp;

      applyTransform(Math.max(0, dy), false);
    };

    const onTouchEnd = (e: TouchEvent) => {
      const d = drag.current;
      if (!d.active || d.intent !== "drag") {
        d.active = false;
        d.intent = null;
        return;
      }
      d.active = false;
      d.intent = null;

      const sheetH = sheet.offsetHeight || 300;
      const isFlick = d.velocity > VELOCITY_THRESHOLD;
      const isPastThreshold = d.offset >= sheetH * CLOSE_THRESHOLD_RATIO;
      settle(isFlick || isPastThreshold);
    };

    const onTouchCancel = () => {
      const d = drag.current;
      d.active = false;
      d.intent = null;
      applyTransform(0, true);
    };

    sheet.addEventListener("touchstart", onTouchStart, { passive: true });
    sheet.addEventListener("touchmove", onTouchMove, { passive: false });
    sheet.addEventListener("touchend", onTouchEnd, { passive: true });
    sheet.addEventListener("touchcancel", onTouchCancel, { passive: true });

    return () => {
      sheet.removeEventListener("touchstart", onTouchStart);
      sheet.removeEventListener("touchmove", onTouchMove);
      sheet.removeEventListener("touchend", onTouchEnd);
      sheet.removeEventListener("touchcancel", onTouchCancel);
    };
  }, [settle]);

  // Reset when closed
  React.useEffect(() => {
    if (!isOpen && sheetRef.current) {
      drag.current.active = false;
      drag.current.intent = null;
      sheetRef.current.style.transition = "";
      sheetRef.current.style.transform = "";
    }
  }, [isOpen]);

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
        height={height}
        bgColor={bgColor}
      >
        <HandleBar>
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
        <SheetBody ref={bodyRef}>{children}</SheetBody>
      </Sheet>
    </Overlay>
  );
};
