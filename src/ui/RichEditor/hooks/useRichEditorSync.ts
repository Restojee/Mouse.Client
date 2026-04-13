import { useEffect } from "react";
import type { Editor } from "@tiptap/react";

export const useRichEditorSync = (editor: Editor | null, value: string | undefined, disabled: boolean) => {
  useEffect(() => {
    if (!editor) return;
    const currentMarkdown = (
      editor.storage as unknown as { markdown: { getMarkdown: () => string } }
    ).markdown.getMarkdown();
    if (value !== undefined && value !== currentMarkdown) {
      if (value === "") {
        editor.commands.clearContent(true);
      } else {
        editor.commands.setContent(value, { emitUpdate: false });
      }
    }
  }, [value, editor]);

  useEffect(() => {
    if (editor) editor.setEditable(!disabled);
  }, [disabled, editor]);
};
