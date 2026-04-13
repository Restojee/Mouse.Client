import { useInfiniteScroll } from "@/hooks/useInfiniteScroll";
import React from "react";

export interface InfiniteScrollProps {
  children: React.ReactNode;
  onLoadMore: () => void;
  hasMore: boolean;
  isLoading: boolean;
  rootRef?: React.RefObject<HTMLElement>;
  /** Позиция сентинела относительно загруженных элементов (0–1). По умолчанию 0.7 */
  sentinelPosition?: number;
  rootMargin?: string;
  threshold?: number;
}

export const InfiniteScroll: React.FC<InfiniteScrollProps> = ({
  children,
  onLoadMore,
  hasMore,
  isLoading,
  rootRef,
  sentinelPosition = 0.7,
  rootMargin = "0px",
  threshold = 0.1,
}) => {
  const sentinelRef = useInfiniteScroll({
    onLoadMore,
    hasMore,
    isLoading,
    rootRef,
    rootMargin,
    threshold,
  });

  const items = React.Children.toArray(children);
  const sentinelIndex = hasMore ? Math.floor(items.length * sentinelPosition) : -1;

  return (
    <>
      {items.map((child, index) => (
        <React.Fragment key={(child as React.ReactElement).key ?? index}>
          {index === sentinelIndex && (
            <div
              ref={sentinelRef}
              style={{ height: 0, pointerEvents: "none" }}
            />
          )}
          {child}
        </React.Fragment>
      ))}
    </>
  );
};
