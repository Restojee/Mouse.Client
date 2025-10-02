import { MapById } from "@/api/codegen/genMouseMapsApi";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { updateMapNameThunk } from "@/modules/map/containers/map-content/slice";
import { useMap } from "@/modules/map/common";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectIsAuth } from "@/modules/auth/slice";
import { CopyIcon } from "@/svg/CopyIcon";
import { StyledBox } from "@/ui/Box";
import { IconButton } from "@/ui/Button/IconButton";
import { Typography } from "@/ui/Typography";
import React, { useCallback, useEffect, useState } from "react";
import { MAP_ADDITIONAL_INFO, MapInfoType } from "../../constants";
import { EditableText } from "@/ui/EditableText/EditableText";

type MapContentHeaderPropsType = {
  completeCount?: number;
  viewCount?: number;
  commentsCount?: number;
  title?: MapById["name"];
};
export const Header = (props: MapContentHeaderPropsType) => {
  const { completeCount, viewCount, commentsCount, title } = props;
  const dispatch = useAppDispatch();
  const { onMapNameCopy, map } = useMap();
  const isAuth = useAppSelector(selectIsAuth);

  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState<string>(title || "");

  useEffect(() => {
    if (!isEditing) {
      setValue(title || "");
    }
  }, [title, isEditing]);

  const stopEditAndSave = useCallback(async () => {
    const newName = value.trim();
    setIsEditing(false);

    if (!map?.id || !newName) {
      setValue(title || "");
      return;
    }

    if (!isAuth) {
      setValue(title || "");
      return;
    }

    if (newName === (title || "")) {
      return;
    }

    try {
      await dispatch(updateMapNameThunk({ id: map.id, name: newName, description: "" })).unwrap();
    } catch (err) {
      setValue(title || "");
    }
  }, [dispatch, map?.id, title, value, isAuth]);

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
        <Typography fontSize={"1.1rem"}>!map</Typography>
        <EditableText
          value={value}
          onChange={setValue}
          onSave={stopEditAndSave}
          onCancel={() => setValue(title || "")}
          ariaLabel="Название карты"
          disabled={!isAuth}
        />
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
