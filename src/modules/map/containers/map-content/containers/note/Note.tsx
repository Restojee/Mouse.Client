import React from "react";
import { RichEditor } from "@/ui/RichEditor";
import { Typography } from "@/ui/Typography";
import styles from "./Note.module.scss";
import { useNote } from "./hooks/useNote";

export const Note = () => {
  const { value, placeholder, onChangeHandler, onSaveNoteHandler } = useNote();

  return (
    <div className={styles.root}>
      <Typography className={styles.label}>Моя заметка</Typography>
      <RichEditor
        value={value}
        onBlur={onSaveNoteHandler}
        onSend={onSaveNoteHandler}
        onChange={onChangeHandler}
        placeholder={placeholder}
      />
    </div>
  );
};
