import React, { memo, useMemo } from "react";
import clsx from "clsx";
import { Skeleton } from "./Skeleton";
import styles from "./MessageSkeleton.module.scss";

type LineSize = "short" | "medium" | "long";

type MessageSkeletonItemProps = {
  lines?: LineSize[];
  withAvatar?: boolean;
  reverse?: boolean;
  avatarSize?: number;
};

const lineClassMap: Record<LineSize, string> = {
  short: styles.lineShort,
  medium: styles.lineMedium,
  long: styles.lineLong,
};

export const MessageSkeletonItem = memo(
  ({ lines = ["long", "medium"], withAvatar = true, reverse = false, avatarSize = 34 }: MessageSkeletonItemProps) => {
    const rowClassName = clsx(styles.row, reverse ? styles.rowReverse : styles.rowAligned);
    return (
      <div className={rowClassName}>
        {withAvatar && (
          <Skeleton
            variant="circle"
            width={avatarSize}
            height={avatarSize}
          />
        )}
        <div className={styles.bubble}>
          {lines.map((size, idx) => (
            <div
              key={idx}
              className={clsx(styles.line, lineClassMap[size])}
            />
          ))}
        </div>
      </div>
    );
  },
);

MessageSkeletonItem.displayName = "MessageSkeletonItem";

type MessageSkeletonProps = {
  count?: number;
  withAvatar?: boolean;
  alternate?: boolean;
  avatarSize?: number;
  items?: Array<{ lines: LineSize[]; reverse?: boolean }>;
  className?: string;
};

const DEFAULT_ITEMS: Array<{ lines: LineSize[]; reverse?: boolean }> = [
  { lines: ["medium", "long"] },
  { lines: ["short"], reverse: true },
  { lines: ["long", "medium", "short"] },
  { lines: ["medium"], reverse: true },
  { lines: ["short", "long"] },
  { lines: ["medium"] },
  { lines: ["long", "short"], reverse: true },
];

export const MessageSkeleton = memo(
  ({ count, withAvatar = true, alternate = false, avatarSize = 34, items, className }: MessageSkeletonProps) => {
    const resolvedItems = useMemo(() => {
      if (items) return items;
      if (count !== undefined) {
        return Array.from({ length: count }, (_, idx) => ({
          lines: (["long", "medium"] as LineSize[]),
          reverse: alternate && idx % 2 === 1,
        }));
      }
      return DEFAULT_ITEMS;
    }, [items, count, alternate]);

    return (
      <div className={clsx(styles.wrapper, className)}>
        {resolvedItems.map((item, idx) => (
          <MessageSkeletonItem
            key={idx}
            lines={item.lines}
            reverse={item.reverse}
            withAvatar={withAvatar}
            avatarSize={avatarSize}
          />
        ))}
      </div>
    );
  },
);

MessageSkeleton.displayName = "MessageSkeleton";
