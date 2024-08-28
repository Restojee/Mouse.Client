import { useMapNote } from "./hooks/useMapNote";
import { StyledMapContentNoteForm } from "@/modules/map/styles/styled";
import React, { ChangeEvent, useEffect, useState } from "react";

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
    <StyledMapContentNoteForm
      value={value}
      onBlur={onSaveNoteHandler}
      onChange={onChangeHandler}
      onKeyUp={onKeyUpHandler}
      placeholder="Нажмите, чтобы написать заметку..."
      maxLength={1000}
    />
  );
};
