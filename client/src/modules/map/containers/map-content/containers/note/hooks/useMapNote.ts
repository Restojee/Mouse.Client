import { useRouter } from "next/router";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { saveMapNoteThunk, selectMapNote } from "../slice";

export const useMapNote = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { levelId } = router.query;

  const note = useAppSelector(selectMapNote);

  const saveNote = (text: string) => {
    const stringLevelId = Number(levelId);
    dispatch(saveMapNoteThunk({ text, levelId: stringLevelId }));
  };

  return {
    note,
    saveNote,
  };
};
