import React, { useCallback, useRef } from "react";
import { EditorProvider } from "../core/EditorContext";
import { EditorCanvas } from "./EditorCanvas";
import { MentionPlugin } from "../plugins/mention/MentionPlugin";
import { LinkPlugin } from "../plugins/link/LinkPlugin";
import { ToolbarPlugin } from "../plugins/toolbar/ToolbarPlugin";
import styles from "./TextEditor.module.css";
import type { EditorContentProps } from "../types";

export type { EditorContentProps };

export const EditorContent: React.FC<EditorContentProps> = ({
  value = "",
  onChange,
  onKeyDown,
  onFocus,
  placeholder,
  disabled,
  onMentionInsert,
  onSend,
  sendDisabled,
  style,
  className,
}) => {
  const divRef = useRef<HTMLDivElement>(null);

  const onChangeForEditor = useCallback(
    (newValue: string) => {
      if (!onChange) return;
      const fakeTarget = { value: newValue } as HTMLTextAreaElement;
      onChange({ target: fakeTarget, currentTarget: fakeTarget } as React.ChangeEvent<HTMLTextAreaElement>);
    },
    [onChange],
  );

  return (
    <EditorProvider
      value={value}
      onChange={onChangeForEditor}
      divRef={divRef}
    >
      <div
        className={`${styles.container}${className ? ` ${className}` : ""}`}
        style={style}
      >
        <EditorCanvas
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChangeForEditor}
          onKeyDown={onKeyDown as ((e: React.KeyboardEvent<HTMLElement>) => void) | undefined}
          onFocus={onFocus}
        />
        <ToolbarPlugin
          onSend={disabled ? undefined : onSend}
          sendDisabled={sendDisabled}
        />
        <MentionPlugin onInsert={onMentionInsert} />
        <LinkPlugin />
      </div>
    </EditorProvider>
  );
};
