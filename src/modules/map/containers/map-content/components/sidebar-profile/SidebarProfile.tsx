import React from "react";
import { User } from "@/api/codegen/genMouseMapsApi";
import { Avatar } from "@/ui/Avatar";
import { Typography } from "@/ui/Typography";
import styles from "./SidebarProfile.module.scss";
import { useSidebarProfile } from "./useSidebarProfile";

type SidebarProfilePropsType = {
  user?: User;
  date: string;
};

export const SidebarProfile = (props: SidebarProfilePropsType) => {
  const { user, date } = props;
  const { isMobile, avatarImage, onUsernameClick } = useSidebarProfile({ user });

  if (isMobile) {
    return (
      <div className={styles.mobile}>
        <Avatar
          size={36}
          image={avatarImage}
          username={user?.username}
        />
        <div className={styles.mobileText}>
          <Typography
            className={styles.mobileName}
            isLink
            isEllipsis
            fontWeight="bold"
            onClick={onUsernameClick}
          >
            {user?.username}
          </Typography>
          <Typography className={styles.mobileDate}>{date}</Typography>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.desktop}>
      <Avatar
        size={80}
        image={avatarImage}
        username={user?.username}
      />
      <div className={styles.desktopText}>
        <Typography
          className={styles.desktopName}
          isLink
          isEllipsis
          fontWeight="bold"
          onClick={onUsernameClick}
        >
          {user?.username}
        </Typography>
        <Typography>{date}</Typography>
      </div>
    </div>
  );
};
