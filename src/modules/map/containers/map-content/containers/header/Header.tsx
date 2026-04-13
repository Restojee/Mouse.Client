import React from "react";
import { MapById } from "@/api/codegen/genMouseMapsApi";
import { CopyIcon } from "@/svg/CopyIcon";
import { IconButton } from "@/ui/Button/IconButton";
import { Typography } from "@/ui/Typography";
import { EditableText } from "@/ui/EditableText/EditableText";
import styles from "./Header.module.scss";
import { useHeader } from "./useHeader";

type HeaderPropsType = {
  completeCount?: number;
  viewCount?: number;
  commentsCount?: number;
  title?: MapById["name"];
};

export const Header = (props: HeaderPropsType) => {
  const { value, setValue, stopEditAndSave, onCancelEdit, onCopyClickHandler, isAuth, renderedInfo } = useHeader(props);

  return (
    <div className={styles.root}>
      <div className={styles.title}>
        <Typography className={styles.titlePrefix}>!map</Typography>
        <EditableText
          value={value}
          onChange={setValue}
          onSave={stopEditAndSave}
          onCancel={onCancelEdit}
          ariaLabel="Название карты"
          disabled={!isAuth}
        />
        <IconButton
          className={styles.copyButton}
          onClick={onCopyClickHandler}
        >
          <CopyIcon />
        </IconButton>
      </div>
      <div className={styles.info}>{renderedInfo}</div>
    </div>
  );
};
