import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { updateMapNameThunk } from "@/modules/map/containers/map-content/slice";
import { useMap } from "@/modules/map/common";
import { selectIsAuth } from "@/modules/auth/slice";
import { MapById } from "@/api/codegen/genMouseMapsApi";
import { MAP_ADDITIONAL_INFO, MapInfoType } from "../../constants";
import { HeaderInfoItem } from "./HeaderInfoItem";

type UseHeaderProps = {
  title?: MapById["name"];
  completeCount?: number;
  viewCount?: number;
  commentsCount?: number;
};

export const useHeader = ({ title, completeCount, viewCount, commentsCount }: UseHeaderProps) => {
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
    } catch {
      setValue(title || "");
    }
  }, [dispatch, map?.id, title, value, isAuth]);

  const onCancelEdit = useCallback(() => {
    setValue(title || "");
  }, [title]);

  const onCopyClickHandler = useCallback(async () => {
    await onMapNameCopy(title);
  }, [onMapNameCopy, title]);

  const renderedInfo = useMemo(() => {
    const counts: { [key in MapInfoType]?: number } = {
      complete: completeCount,
      view: viewCount,
      comments: commentsCount,
    };
    return MAP_ADDITIONAL_INFO.map((info) => (
      <HeaderInfoItem
        key={info.label}
        icon={info.icon}
        title={info.title}
        count={counts[info.label]}
      />
    ));
  }, [completeCount, viewCount, commentsCount]);

  return {
    isEditing,
    value,
    setValue,
    stopEditAndSave,
    onCancelEdit,
    onCopyClickHandler,
    isAuth,
    renderedInfo,
  };
};
