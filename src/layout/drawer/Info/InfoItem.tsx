import { Tip } from "@/api/codegen/genMouseMapsApi";
import { formatDateTime } from "@/common/utils/formatDateTime";
import { useAppSelector } from "@/hooks/useAppSelector";
import infoStyles from "@/layout/drawer/Info/Info.module.scss";
import { selectIsAuth } from "@/modules/auth/slice";
import { CloseIcon } from "@/svg/CloseIcon";
import buttonStyles from "@/ui/Button/styles/Button.module.scss";
import { Display } from "@/ui/Display";
import { Typography } from "@/ui/Typography";
import React, { useMemo, useState } from "react";

type InfoItemPropsType = {
  info: Tip;
  removeInfo: (id: Tip["id"]) => void;
  selectInfo: (info: Tip) => void;
};
export const InfoItem = (props: InfoItemPropsType) => {
  const { info, removeInfo, selectInfo } = props;

  const isAuth = useAppSelector(selectIsAuth);

  const [isHovered, setIsHovered] = useState(false);

  const selectInfoHandler = () => {
    if (!isAuth) {
      return;
    }

    selectInfo(info);
  };

  const removeInfoHandler = () => {
    if (!isAuth) {
      return;
    }

    removeInfo(info.id);
  };

  const formattedDate = useMemo(() => {
    return formatDateTime(info.createdUtcDate);
  }, [info.createdUtcDate]);

  const onMouseEnterHandler = () => setIsHovered(true);
  const onMouseLeaveHandler = () => setIsHovered(false);

  const closeButtonStyle = { opacity: isHovered ? 0.4 : 0, margin: "0 0 0 auto" };
  const metaStyle = { opacity: isHovered ? 0.5 : 0 };

  return (
    <div
      className={infoStyles.infoItem}
      onMouseEnter={onMouseEnterHandler}
      onMouseLeave={onMouseLeaveHandler}
    >
      <div className={infoStyles.infoItemHeader}>
        <div
          className={infoStyles.infoTitle}
          onClick={selectInfoHandler}
        >
          {info.title}
        </div>
        <Display condition={isAuth}>
          <div
            className={buttonStyles.buttonIcon}
            style={closeButtonStyle}
            onClick={removeInfoHandler}
          >
            <CloseIcon />
          </div>
        </Display>
      </div>
      <div className={infoStyles.infoBlock}>
        <Typography>{info.text}</Typography>
      </div>
      <div
        className={infoStyles.infoItemMeta}
        style={metaStyle}
      >
        <Typography>{info.user?.username},</Typography>
        <Typography>{formattedDate}</Typography>
      </div>
    </div>
  );
};
