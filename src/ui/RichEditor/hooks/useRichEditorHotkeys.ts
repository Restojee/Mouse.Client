import { useMemo } from "react";
import type { Editor } from "@tiptap/react";
import { useGlobalKeyDown } from "@/hooks/useGlobalKeyDown";

type Options = {
  editor: Editor | null;
  onSend?: () => void;
  sendDisabled?: boolean;
};

export const useRichEditorHotkeys = ({ editor, onSend, sendDisabled }: Options) => {
  const keyMap = useMemo(
    () => ({
      Enter: (e: KeyboardEvent) => {
        if (!editor?.isFocused) return;
        if (e.shiftKey || e.ctrlKey || e.metaKey) return;
        if (!onSend || sendDisabled) return;
        e.preventDefault();
        onSend();
      },
    }),
    [editor, onSend, sendDisabled],
  );

  useGlobalKeyDown(keyMap);
};
