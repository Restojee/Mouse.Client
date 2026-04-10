import React, { useCallback, useRef, useState } from "react";
import styled from "styled-components";

type Props = {
  activeIndex: number;
  onIndexChange: (index: number) => void;
  children: React.ReactNode[];
};

const Viewport = styled.div({
  overflow: "hidden",
  width: "100%",
  flexGrow: 1,
  display: "flex",
  flexDirection: "column",
  userSelect: "none",
  WebkitUserSelect: "none",
});

const Track = styled.div<{ offset: number; isDragging: boolean; count: number }>(({ offset, isDragging, count }) => ({
  display: "flex",
  flexDirection: "row",
  width: `${count * 100}%`,
  height: "100%",
  transform: `translateX(${offset}px)`,
  transition: isDragging ? "none" : "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  willChange: "transform",
}));

const Slide = styled.div<{ count: number }>(({ count }) => ({
  width: `${100 / count}%`,
  flexShrink: 0,
  display: "flex",
  flexDirection: "column",
  overflow: "hidden",
}));

const SWIPE_THRESHOLD = 40;
const VELOCITY_THRESHOLD = 0.3;

export const DragSlider = ({ activeIndex, onIndexChange, children }: Props) => {
  const count = children.length;
  const viewportRef = useRef<HTMLDivElement>(null);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);

  const touch = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastTime: number;
    velocity: number;
    locked: boolean | null; // null = undecided, true = horizontal, false = vertical
  } | null>(null);

  const getBaseOffset = useCallback((index: number) => {
    const viewportWidth = viewportRef.current?.offsetWidth ?? 0;
    return -(index * viewportWidth);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = {
      startX: t.clientX,
      startY: t.clientY,
      lastX: t.clientX,
      lastTime: e.timeStamp,
      velocity: 0,
      locked: null,
    };
    setIsDragging(false);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    if (!touch.current) return;
    const t = e.touches[0];
    const dx = t.clientX - touch.current.startX;
    const dy = t.clientY - touch.current.startY;

    // Определяем направление при первом движении
    if (touch.current.locked === null) {
      if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
      touch.current.locked = Math.abs(dx) > Math.abs(dy);
    }

    if (!touch.current.locked) return; // вертикальный скролл — не мешаем

    e.preventDefault();

    const dt = e.timeStamp - touch.current.lastTime;
    if (dt > 0) touch.current.velocity = (t.clientX - touch.current.lastX) / dt;
    touch.current.lastX = t.clientX;
    touch.current.lastTime = e.timeStamp;

    const base = getBaseOffset(activeIndex);
    const viewportWidth = viewportRef.current?.offsetWidth ?? 1;

    // Резиновый эффект на краях
    let offset = base + dx;
    const maxOffset = 0;
    const minOffset = getBaseOffset(count - 1);
    if (offset > maxOffset) offset = maxOffset + (offset - maxOffset) * 0.3;
    if (offset < minOffset) offset = minOffset + (offset - minOffset) * 0.3;

    setDragOffset(offset - base);
    setIsDragging(true);
  };

  const onTouchEnd = () => {
    if (!touch.current || !isDragging) {
      touch.current = null;
      return;
    }

    const { velocity } = touch.current;
    const viewportWidth = viewportRef.current?.offsetWidth ?? 1;
    const absOffset = Math.abs(dragOffset);

    let nextIndex = activeIndex;

    if (velocity < -VELOCITY_THRESHOLD || (dragOffset < 0 && absOffset > SWIPE_THRESHOLD)) {
      nextIndex = Math.min(count - 1, activeIndex + 1);
    } else if (velocity > VELOCITY_THRESHOLD || (dragOffset > 0 && absOffset > SWIPE_THRESHOLD)) {
      nextIndex = Math.max(0, activeIndex - 1);
    }

    touch.current = null;
    setDragOffset(0);
    setIsDragging(false);

    if (nextIndex !== activeIndex) {
      onIndexChange(nextIndex);
    }
  };

  const totalOffset = getBaseOffset(activeIndex) + dragOffset;

  return (
    <Viewport
      ref={viewportRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      <Track
        offset={totalOffset}
        isDragging={isDragging}
        count={count}
      >
        {children.map((child, i) => (
          <Slide
            key={i}
            count={count}
          >
            {child}
          </Slide>
        ))}
      </Track>
    </Viewport>
  );
};
