import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAuth } from "@/modules/auth/slice";
import { Display } from "@/ui/Display";
import React, { useMemo, useState } from "react";
import { formatDateTime } from "@/common/utils/formatDateTime";
import { Tip } from "@/api/codegen/genMouseMapsApi";
import { StyledInfoBlock, StyledInfoTitle } from "@/layout/drawer/Info/styled";
import { CloseIcon } from "@/svg/CloseIcon";
import { StyledBox } from "@/ui/Box";
import { StyledButtonIcon } from "@/ui/Button/styles/StyledButtonIcon";
import { Typography } from "@/ui/Typography";

type InfoItemPropsType = {
  info: Tip;
  removeInfo: (id: Tip["id"]) => void;
  selectInfo: (info: Tip) => void;
}
export const InfoItem = (props: InfoItemPropsType) => {
  const {
    info,
    removeInfo,
    selectInfo,
  } = props;

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

  return (
    <StyledBox
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      gap="5px"
      direction="column"
    >
      <StyledBox align="center">
        <StyledInfoTitle onClick={selectInfoHandler}>
          {info.title}
        </StyledInfoTitle>
        <Display condition={isAuth}>
          <StyledButtonIcon
            opacity={isHovered ? "0.4" : "0"}
            onClick={removeInfoHandler}
            margin="0 0 0 auto"
          >
            <CloseIcon color="gray"/>
          </StyledButtonIcon>
        </Display>
      </StyledBox>
      <StyledInfoBlock>
        <Typography>{info.text}</Typography>
      </StyledInfoBlock>
      <StyledBox
        margin={"0 15px 0 auto"}
        gap={5}
        justify={"space-between"}
        fontSize={"0.8rem"}
        opacity={isHovered ? "0.5" : "0"}
      >
        <Typography>
          {info.user?.username},
        </Typography>
        <Typography>
          {formattedDate}
        </Typography>
      </StyledBox>

    </StyledBox>
  );
};

