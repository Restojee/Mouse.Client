import React, { useRef } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import { SendIcon } from "@/svg/SendIcon";
import { IconButton } from "@/ui/Button/IconButton";
import { Box } from "@/ui/Box";
import styles from "./RichEditor.module.css";
import type { MentionSuggestion } from "./userMentionSuggestion";
import { useRichEditorExtensions } from "./hooks/useRichEditorExtensions";
import { useRichEditorHotkeys } from "./hooks/useRichEditorHotkeys";
import { useRichEditorSync } from "./hooks/useRichEditorSync";
import { RichEditorRef, useRichEditorImperative } from "./hooks/useRichEditorImperative";

export type { RichEditorRef };

type RichEditorProps = {
  value?: string;
  onChange?: (value: string) => void;
  onFocus?: () => void;
  onBlur?: () => void;
  placeholder?: string;
  disabled?: boolean;
  mention?: MentionSuggestion;
  levelMention?: MentionSuggestion;
  onSend?: () => void;
  sendDisabled?: boolean;
  editorRef?: React.Ref<RichEditorRef>;
  className?: string;
  maxLength?: number;
};

export const RichEditor: React.FC<RichEditorProps> = ({
  value,
  onChange,
  onFocus,
  onBlur,
  placeholder = "",
  disabled = false,
  mention,
  levelMention,
  onSend,
  sendDisabled,
  editorRef,
  className,
  maxLength = 400,
}) => {
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const extensions = useRichEditorExtensions({ placeholder, mention, levelMention, maxLength });

  const editor = useEditor({
    extensions,
    content: value || "",
    editable: !disabled,
    immediatelyRender: false,
    onUpdate({ editor: ed }) {
      onChangeRef.current?.(
        (ed.storage as unknown as { markdown: { getMarkdown: () => string } }).markdown.getMarkdown(),
      );
    },
    onFocus() {
      onFocus?.();
    },
    onBlur() {
      onBlur?.();
    },
    editorProps: {
      attributes: {
        class: styles.editor,
        "data-placeholder": placeholder,
      },
    },
  });

  useRichEditorSync(editor, value, disabled);
  useRichEditorHotkeys({ editor, onSend, sendDisabled });
  useRichEditorImperative(editor, editorRef);

  return (
    <Box
      position="relative"
      width="100%"
      className={`${styles.wrapper}${onSend ? ` ${styles.wrapperWithSend}` : ""}${className ? ` ${className}` : ""}`}
    >
      <EditorContent
        className={styles.editor}
        editor={editor}
      />
      <IconButton
        className={styles.sendButton}
        onMouseDown={(e) => {
          e.preventDefault();
          if (!sendDisabled) onSend?.();
        }}
        disabled={sendDisabled}
        type="button"
        aria-label="Отправить"
      >
        <SendIcon size="28px" />
      </IconButton>
    </Box>
  );
};
