import { useCallback, useEffect, useState } from "react";
import { useMapNote } from "./useMapNote";

export const useNote = () => {
  const { note, saveNote } = useMapNote();
  const [value, setValue] = useState("");

  const onChangeHandler = useCallback((next: string) => {
    setValue(next);
  }, []);

  const onSaveNoteHandler = useCallback(() => {
    const text = value.trim();
    if (note === text) {
      return;
    }
    saveNote(text);
  }, [note, value, saveNote]);

  useEffect(() => {
    setValue(note);
  }, [note]);

  const placeholder = "Нажмите, чтобы написать заметку...";

  return { value, placeholder, onChangeHandler, onSaveNoteHandler };
};
