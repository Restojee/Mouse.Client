import React, { useEffect } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { InfoItem } from "@/layout/drawer/Info/InfoItem";
import { selectIsAuth } from "@/modules/auth/slice";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useInfo } from "@/modules/info/hooks/useInfo";
import { getInfoThunk } from "@/modules/info/slice";
import { AddIcon } from "@/svg/AddIcon";
import { MessageSkeleton } from "@/ui/Skeleton";
import { IconButton } from "@/ui/Button/IconButton";
import { Display } from "@/ui/Display";
import { Typography } from "@/ui/Typography/styles/Typography";
import infoStyles from "@/layout/drawer/Info/Info.module.scss";
import drawerStyles from "@/layout/drawer/Drawer.module.scss";

export const Info = () => {
  const dispatch = useAppDispatch();
  const { theme } = useAppTheme();

  const isAuth = useAppSelector(selectIsAuth);

  const { onModalOpen, infoList, removeInfo, isInfoFetching, selectInfo } = useInfo();

  useEffect(() => {
    dispatch(getInfoThunk());
  }, [dispatch]);

  return (
    <div className={infoStyles.infoContainer}>
      <div className={drawerStyles.drawerHeader}>
        <Typography>Полезная инфа</Typography>
        <Display condition={isAuth}>
          <IconButton onClick={() => onModalOpen()}>
            <AddIcon color={theme.colors.textOnSecondary} />
          </IconButton>
        </Display>
      </div>
      <Display condition={isInfoFetching ? !infoList?.length : null}>
        <MessageSkeleton count={4} />
      </Display>
      <Display condition={infoList?.length}>
        <div className={infoStyles.infoList}>
          {infoList?.map((info) => (
            <InfoItem
              key={info.id}
              info={info}
              selectInfo={selectInfo}
              removeInfo={removeInfo}
            />
          ))}
        </div>
      </Display>
      <Display condition={!infoList?.length && !isInfoFetching}>
        <div className={infoStyles.infoEmpty}>Полезной инфы еще нет.</div>
      </Display>
    </div>
  );
};
