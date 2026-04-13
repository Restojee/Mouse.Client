import React, { useCallback, useMemo, useState } from "react";
import { useAppTheme } from "@/hooks/useAppTheme";
import { getInitials } from "@/ui/Avatar/utils";

type UseAvatarProps = {
  size?: React.CSSProperties["width"];
  image?: string;
  username?: string;
};

const LARGE_SIZE_THRESHOLD = 70;

export const useAvatar = ({ size, image, username }: UseAvatarProps) => {
  const { theme } = useAppTheme();

  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const initials = useMemo(() => getInitials(username), [username]);

  const isLarge = useMemo(() => typeof size === "number" && size > LARGE_SIZE_THRESHOLD, [size]);

  const rootStyle = useMemo<React.CSSProperties>(
    () => ({
      width: size,
      height: size,
      minWidth: size,
      backgroundColor: image ? undefined : theme.colors.mapBackgroundLight,
    }),
    [size, image, theme.colors.mapBackgroundLight],
  );

  const onImageLoad = useCallback(() => setIsImageLoaded(true), []);

  const showSkeleton = Boolean(image) && !isImageLoaded;

  return { initials, isLarge, rootStyle, isImageLoaded, showSkeleton, onImageLoad };
};
