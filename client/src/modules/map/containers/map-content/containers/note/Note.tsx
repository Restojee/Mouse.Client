import { StyledMapContentNoteForm } from "@/modules/map/styles/styled";
import { StyledBox } from "@/ui/Box";
import { Typography } from "@/ui/Typography";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useMapNote } from "./hooks/useMapNote";

export const Note = () => {
  const { note, saveNote } = useMapNote();

  const [value, setValue] = useState("");

  const onChangeHandler = (e: ChangeEvent<HTMLTextAreaElement>) => {
    const text = e.currentTarget.value;
    setValue(text);
  };

  const onSaveNoteHandler = () => {
    const text = value.trim();
    if (note === value) {
      return;
    }

    saveNote(text);
  };

  const onKeyUpHandler = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    e.stopPropagation();

    if (e.key === "Enter") {
      onSaveNoteHandler();
    }

    if (e.key === "Escape") {
      setValue(note);
    }
  };

  useEffect(() => {
    setValue(note);
  }, [note]);

  return (
    <StyledBox
      textAlign={"start"}
      direction={"column"}
      gap={15}
    >
      <Typography
        margin={"0 0 0 10px"}
        opacity={0.3}
      >
        Моя заметка
      </Typography>
      <StyledMapContentNoteForm
        value={value}
        onBlur={onSaveNoteHandler}
        onChange={onChangeHandler}
        onKeyUp={onKeyUpHandler}
        placeholder="Нажмите, чтобы написать заметку..."
        maxLength={1000}
      />
    </StyledBox>
  );
};
