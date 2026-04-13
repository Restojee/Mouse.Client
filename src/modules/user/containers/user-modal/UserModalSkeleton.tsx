import React, { memo } from "react";
import { Skeleton } from "@/ui/Skeleton";
import styles from "./UserModal.module.scss";

export const UserModalSkeleton = memo(() => {
  return (
    <div className={styles.root}>
      <div className={styles.profile}>
        <Skeleton
          variant="circle"
          width={100}
          height={100}
        />
        <Skeleton
          width={140}
          height={20}
        />
        <div className={styles.meta}>
          <Skeleton
            width={160}
            height={14}
          />
        </div>
      </div>
      <div className={styles.stats}>
        <Skeleton
          variant="circle"
          width={70}
          height={70}
        />
        <Skeleton
          variant="circle"
          width={70}
          height={70}
        />
        <Skeleton
          variant="circle"
          width={70}
          height={70}
        />
        <Skeleton
          variant="circle"
          width={70}
          height={70}
        />
      </div>
      <Skeleton
        width={120}
        height={44}
        borderRadius={50}
      />
    </div>
  );
});

UserModalSkeleton.displayName = "UserModalSkeleton";
