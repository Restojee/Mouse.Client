import React, { useCallback, useRef } from "react";
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

const Track = styled.div<{ count: number }>(({ count }) => ({
  display: "flex",
  flexDirection: "row",
  width: `${count * 100}%`,
  height: "100%",
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
  const trackRef = useRef<HTMLDivElement>(null);

  const activeIndexRef = useRef(activeIndex);
  activeIndexRef.current = activeIndex;

  const touch = useRef<{
    startX: number;
    startY: number;
    lastX: number;
    lastTime: number;
    velocity: number;
    locked: boolean | null;
    dragOffset: number;
  } | null>(null);

  const getBaseOffset = useCallback((index: number) => {
    const w = viewportRef.current?.offsetWidth ?? 0;
    return -(index * w);
  }, []);

  const applyTransform = useCallback((offset: number, animated: boolean) => {
    const track = trackRef.current;
    if (!track) return;
    track.style.transition = animated ? "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)" : "none";
    track.style.transform = `translateX(${offset}px)`;
  }, []);

  const onTouchStart = useCallback((e: React.TouchEvent) => {
    const t = e.touches[0];
    touch.current = {
      startX: t.clientX,
      startY: t.clientY,
      lastX: t.clientX,
      lastTime: e.timeStamp,
      velocity: 0,
      locked: null,
      dragOffset: 0,
    };
    const track = trackRef.current;
    if (track) track.style.transition = "none";
  }, []);

  const onTouchMove = useCallback((e: React.TouchEvent) => {
    if (!touch.current) return;
    const t = e.touches[0];
    const dx = t.clientX - touch.current.startX;
    const dy = t.clientY - touch.current.startY;

    if (touch.current.locked === null) {
      if (Math.abs(dx) < 5 && Math.abs(dy) < 5) return;
      touch.current.locked = Math.abs(dx) > Math.abs(dy);
    }

    if (!touch.current.locked) return;

    e.preventDefault();

    const dt = e.timeStamp - touch.current.lastTime;
    if (dt > 0) touch.current.velocity = (t.clientX - touch.current.lastX) / dt;
    touch.current.lastX = t.clientX;
    touch.current.lastTime = e.timeStamp;

    const base = getBaseOffset(activeIndexRef.current);
    const maxOffset = 0;
    const minOffset = getBaseOffset(count - 1);
    let offset = base + dx;
    if (offset > maxOffset) offset = maxOffset + (offset - maxOffset) * 0.3;
    if (offset < minOffset) offset = minOffset + (offset - minOffset) * 0.3;

    touch.current.dragOffset = offset - base;
    applyTransform(offset, false);
  }, [applyTransform, getBaseOffset, count]);

  const onTouchEnd = useCallback(() => {
    if (!touch.current) return;
    const { velocity, dragOffset, locked } = touch.current;
    touch.current = null;

    if (!locked) return;

    const absOffset = Math.abs(dragOffset);
    const current = activeIndexRef.current;
    let nextIndex = current;

    if (velocity < -VELOCITY_THRESHOLD || (dragOffset < 0 && absOffset > SWIPE_THRESHOLD)) {
      nextIndex = Math.min(count - 1, current + 1);
    } else if (velocity > VELOCITY_THRESHOLD || (dragOffset > 0 && absOffset > SWIPE_THRESHOLD)) {
      nextIndex = Math.max(0, current - 1);
    }

    applyTransform(getBaseOffset(nextIndex), true);

    if (nextIndex !== current) {
      onIndexChange(nextIndex);
    }
  }, [applyTransform, getBaseOffset, count, onIndexChange]);

  React.useLayoutEffect(() => {
    applyTransform(getBaseOffset(activeIndex), true);
  }, [activeIndex, applyTransform, getBaseOffset]);

  return (
    <Viewport
      ref={viewportRef}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
      onTouchCancel={onTouchEnd}
    >
      <Track ref={trackRef} count={count}>
        {children.map((child, i) => (
          <Slide key={i} count={count}>
            {child}
          </Slide>
        ))}
      </Track>
    </Viewport>
  );
};
