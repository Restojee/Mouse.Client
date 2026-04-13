import React, { memo } from "react";
import { Skeleton } from "@/ui/Skeleton";
import skeletonStyles from "./MapContentSkeleton.module.scss";

export const MapContentMainSkeleton = memo(() => {
  return (
    <div className={skeletonStyles.main}>
      <div className={skeletonStyles.header}>
        <div className={skeletonStyles.title}>
          <Skeleton
            width={50}
            height={22}
          />
          <Skeleton
            width={180}
            height={24}
          />
        </div>
        <div className={skeletonStyles.headerInfo}>
          <Skeleton
            width={50}
            height={18}
          />
          <Skeleton
            width={50}
            height={18}
          />
          <Skeleton
            width={50}
            height={18}
          />
        </div>
      </div>

      <Skeleton className={skeletonStyles.preview} />

      <div className={skeletonStyles.miniMap}>
        <Skeleton className={skeletonStyles.miniMapItem} />
        <Skeleton className={skeletonStyles.miniMapItem} />
        <Skeleton className={skeletonStyles.miniMapItem} />
        <Skeleton className={skeletonStyles.miniMapItem} />
        <Skeleton className={skeletonStyles.miniMapItem} />
      </div>

      <div className={skeletonStyles.tags}>
        <Skeleton
          className={skeletonStyles.tag}
          width={70}
        />
        <Skeleton
          className={skeletonStyles.tag}
          width={90}
        />
        <Skeleton
          className={skeletonStyles.tag}
          width={60}
        />
        <Skeleton
          className={skeletonStyles.tag}
          width={80}
        />
      </div>
    </div>
  );
});

MapContentMainSkeleton.displayName = "MapContentMainSkeleton";

export const MapContentSidebarSkeleton = memo(() => {
  return (
    <div className={skeletonStyles.sidebar}>
      <div className={skeletonStyles.profile}>
        <Skeleton
          variant="circle"
          width={56}
          height={56}
        />
        <div className={skeletonStyles.profileText}>
          <Skeleton
            width="60%"
            height={16}
          />
          <Skeleton
            width="40%"
            height={12}
          />
        </div>
      </div>

      <div className={skeletonStyles.icons}>
        <Skeleton className={skeletonStyles.icon} />
        <Skeleton className={skeletonStyles.icon} />
        <Skeleton className={skeletonStyles.icon} />
        <Skeleton className={skeletonStyles.icon} />
      </div>

      <div className={skeletonStyles.commentsHeader}>
        <Skeleton
          width={120}
          height={18}
        />
        <Skeleton
          width={40}
          height={18}
        />
      </div>

      <div className={skeletonStyles.comments}>
        {Array.from({ length: 4 }).map((_, idx) => (
          <div
            key={idx}
            className={skeletonStyles.comment}
          >
            <Skeleton
              variant="circle"
              width={36}
              height={36}
            />
            <div className={skeletonStyles.commentBody}>
              <Skeleton
                width="45%"
                height={12}
              />
              <Skeleton
                width="95%"
                height={10}
              />
              <Skeleton
                width="70%"
                height={10}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

MapContentSidebarSkeleton.displayName = "MapContentSidebarSkeleton";
