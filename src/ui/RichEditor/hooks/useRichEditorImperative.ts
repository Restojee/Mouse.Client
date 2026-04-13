import { useImperativeHandle } from "react";
import type { Editor } from "@tiptap/react";

export type RichEditorRef = {
  focus(): void;
  clear(): void;
  getText(): string;
  getHTML(): string;
};

export const useRichEditorImperative = (editor: Editor | null, ref?: React.Ref<RichEditorRef>) => {
  useImperativeHandle(ref, () => ({
    focus() {
      editor?.commands.focus();
    },
    clear() {
      editor?.commands.clearContent(true);
    },
    getText() {
      return editor?.getText() ?? "";
    },
    getHTML() {
      return editor?.getHTML() ?? "";
    },
  }));
};
