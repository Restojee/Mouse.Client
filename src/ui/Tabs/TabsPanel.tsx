import React from "react";
import styled from "styled-components";

type Props = {
  activeIndex: number;
  children: React.ReactNode[];
};

const Viewport = styled.div({
  overflow: "hidden",
  width: "100%",
});

const Track = styled.div<{ activeIndex: number; count: number }>(({ activeIndex, count }) => ({
  display: "flex",
  width: `${count * 100}%`,
  transform: `translateX(-${(activeIndex / count) * 100}%)`,
  transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
}));

const Slide = styled.div<{ count: number }>(({ count }) => ({
  width: `${100 / count}%`,
  flexShrink: 0,
}));

export const TabsPanel = ({ activeIndex, children }: Props) => {
  const count = children.length;

  return (
    <Viewport>
      <Track
        activeIndex={activeIndex}
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
