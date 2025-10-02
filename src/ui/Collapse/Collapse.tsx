import React, { useEffect, useRef, useState } from "react";

type CollapseProps = {
  isOpen?: boolean;
  duration?: number; // milliseconds
  children?: React.ReactNode;
};

export const Collapse = (props: CollapseProps) => {
  const { isOpen = true, duration = 300, children } = props;
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [contentHeight, setContentHeight] = useState<number>(0);

  // Observe content size changes to keep max-height in sync without fixed values
  useEffect(() => {
    const el = contentRef.current;
    if (!el) return;

    const measure = () => setContentHeight(el.scrollHeight);
    measure();

    let observer: ResizeObserver | null = null;
    try {
      observer = new ResizeObserver(() => measure());
      observer.observe(el);
    } catch (e) {
      // Fallback: re-measure on window resize
      const onResize = () => measure();
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    return () => {
      observer && observer.disconnect();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        maxHeight: isOpen ? contentHeight : 0,
        overflow: "hidden",
        transition: `max-height ${duration}ms ease`,
      }}
    >
      <div ref={contentRef}>{children}</div>
    </div>
  );
};

export default Collapse;
