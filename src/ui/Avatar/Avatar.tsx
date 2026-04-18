import React from "react";
import clsx from "clsx";
import { DEFAULT_MAP_IMAGE } from "@/common/constants";
import { AVATAR_SIZE } from "@/ui/Avatar/constants";
import { Display } from "@/ui/Display";
import styles from "./Avatar.module.scss";
import { useAvatar } from "./useAvatar";

type AvatarPropsType = {
  image?: string;
  username?: string;
  size?: React.CSSProperties["width"];
};

export const Avatar = (props: AvatarPropsType) => {
  const { size = AVATAR_SIZE, image, username } = props;
  const { initials, isLarge, rootStyle, isImageLoaded, showSkeleton, onImageLoad } = useAvatar({
    size,
    image,
    username,
  });

  const rootClassName = clsx(styles.root, isLarge && styles.large);
  const imageClassName = clsx(styles.image, !isImageLoaded && styles.imageHidden);
  const imageSrc = image || DEFAULT_MAP_IMAGE;

  return (
    <div
      className={rootClassName}
      style={rootStyle}
    >
      <Display condition={image}>
        <img
          src={imageSrc}
          width={size}
          height={size}
          className={imageClassName}
          alt={username}
          onLoad={onImageLoad}
        />
      </Display>
      <Display condition={!image}>
        <div>{initials}</div>
      </Display>
      <Display condition={showSkeleton}>
        <div className={styles.skeleton} />
      </Display>
    </div>
  );
};
