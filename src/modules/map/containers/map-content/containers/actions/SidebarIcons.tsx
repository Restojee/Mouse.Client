import React from "react";
import { Display } from "@/ui/Display";
import { OutIcon } from "@/svg/OutIcon";
import { TrashIcon } from "@/svg/TrashIcon";
import { AddImageIcon } from "@/svg/AddImageIcon";
import { FavoriteIcon } from "@/svg/FavoriteIcon";
import { Map } from "@/api/codegen/genMouseMapsApi";
import { ContentSidebarBodyCount } from "@/modules/map/styles/ContentSidebarBodyCount/ContentSidebarBodyCount";
import { ContentSidebarBodyIcon } from "@/modules/map/styles/ContentSidebarBodyIcon/ContentSidebarBodyIcon";
import styles from "./SidebarIcons.module.scss";
import { useSidebarIcons } from "./useSidebarIcons";

type SidebarIconsPropsType = {
  levelId: Map["id"];
  isCompleted?: boolean;
  isFavorite?: boolean;
  favoritesCount?: number;
};

export const SidebarIcons = (props: SidebarIconsPropsType) => {
  const { favoritesCount } = props;
  const {
    isAuth,
    isDeleteDisabled,
    iconsProps,
    completedIconColor,
    favoriteIconColor,
    onCompletedMapModalOpen,
    onToggleMapFavoriteHandler,
    onMapShare,
    onMapDelete,
  } = useSidebarIcons(props);

  return (
    <div className={styles.root}>
      <ContentSidebarBodyIcon
        disabled={!isAuth}
        onClick={onCompletedMapModalOpen}
      >
        <AddImageIcon
          {...iconsProps}
          color={completedIconColor}
        />
      </ContentSidebarBodyIcon>
      <ContentSidebarBodyIcon
        disabled={!isAuth}
        onClick={onToggleMapFavoriteHandler}
      >
        <FavoriteIcon
          {...iconsProps}
          color={favoriteIconColor}
        />
        <Display condition={favoritesCount}>
          <ContentSidebarBodyCount>{favoritesCount}</ContentSidebarBodyCount>
        </Display>
      </ContentSidebarBodyIcon>
      <ContentSidebarBodyIcon onClick={onMapShare}>
        <OutIcon {...iconsProps} />
      </ContentSidebarBodyIcon>
      <ContentSidebarBodyIcon
        disabled={isDeleteDisabled}
        onClick={onMapDelete}
      >
        <TrashIcon {...iconsProps} />
      </ContentSidebarBodyIcon>
    </div>
  );
};
