import { MapById } from "@/api/codegen/genMouseMapsApi";
import { useMap } from "@/modules/map/common";
import { CopyIcon } from "@/svg/CopyIcon";
import { StyledBox } from "@/ui/Box";
import { IconButton } from "@/ui/Button/IconButton";
import { Typography } from "@/ui/Typography";
import React from "react";
import { MAP_ADDITIONAL_INFO, MapInfoType } from "../../constants";

type MapContentHeaderPropsType = {
  completeCount?: number;
  viewCount?: number;
  commentsCount?: number;
  title?: MapById["name"];
};
export const Header = (props: MapContentHeaderPropsType) => {
  const { completeCount, viewCount, commentsCount, title } = props;

  const { onMapNameCopy } = useMap();

  const counts: { [key in MapInfoType]?: number } = {
    complete: completeCount,
    view: viewCount,
    comments: commentsCount,
  };

  const onCopyClickHandler = async () => {
    await onMapNameCopy(title);
  };

  return (
    <StyledBox
      justify={"space-between"}
      align={"center"}
    >
      <StyledBox
        align={"center"}
        gap={10}
      >
        <Typography fontSize={"1.1rem"}>!map {title}</Typography>
        <IconButton
          opacity="0.6"
          onClick={onCopyClickHandler}
        >
          <CopyIcon />
        </IconButton>
      </StyledBox>
      <StyledBox
        opacity={0.6}
        align={"center"}
        gap={15}
      >
        {MAP_ADDITIONAL_INFO?.map((info, index) => (
          <StyledBox
            key={index}
            gap="5px"
            align="center"
            title={info.title}
          >
            {info.icon}
            <Typography>{counts[info.label]}</Typography>
          </StyledBox>
        ))}
      </StyledBox>
    </StyledBox>
  );
};
