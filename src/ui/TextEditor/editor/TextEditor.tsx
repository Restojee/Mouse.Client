import React, { useCallback, useRef } from "react";
import { useTheme } from "styled-components";
import { EditorProvider } from "../core/EditorContext";
import { EditorCanvas } from "./EditorCanvas";
import { MentionPlugin } from "../plugins/mention/MentionPlugin";
import { LinkPlugin } from "../plugins/link/LinkPlugin";
import { ToolbarPlugin } from "../plugins/toolbar/ToolbarPlugin";
import styles from "./TextEditor.module.css";
import type { TextEditorProps } from "../types";

export const TextEditor: React.FC<TextEditorProps> = ({
  value = "",
  onChange,
  onKeyDown,
  onFocus,
  placeholder,
  disabled,
  bgColor,
  onMentionInsert,
  children,
}) => {
  const theme = useTheme() as {
    colors: {
      input: { default: string; border: string; hover: string };
      brandColor: string;
      textOnSecondary: string;
      secondaryAccent: string;
      secondaryDark: string;
      disabled: string;
    };
    font: { fontSize: string };
  };

  const divRef = useRef<HTMLDivElement>(null);

  const onChangeForEditor = useCallback(
    (newValue: string) => {
      if (!onChange) return;
      const fakeTarget = { value: newValue } as HTMLTextAreaElement;
      onChange({ target: fakeTarget, currentTarget: fakeTarget } as React.ChangeEvent<HTMLTextAreaElement>);
    },
    [onChange],
  );

  const cssVars = {
    "--editor-bg": bgColor ?? theme.colors.input.default,
    "--editor-bg-hover": theme.colors.input.hover,
    "--editor-border": theme.colors.input.border,
    "--editor-border-focus": theme.colors.secondaryAccent,
    "--editor-color": theme.colors.textOnSecondary,
    "--editor-placeholder": theme.colors.disabled,
    "--editor-brand": theme.colors.brandColor,
    "--editor-toolbar-bg": theme.colors.secondaryDark,
    "--editor-toolbar-icon": theme.colors.textOnSecondary,
    "--editor-font-size": theme.font.fontSize,
  } as React.CSSProperties;

  return (
    <EditorProvider
      value={value}
      onChange={onChangeForEditor}
      divRef={divRef}
    >
      <div
        className={styles.container}
        style={cssVars}
      >
        <ToolbarPlugin />
        {children}
        <EditorCanvas
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChangeForEditor}
          onKeyDown={onKeyDown}
          onFocus={onFocus}
        />
      </div>
      <MentionPlugin onInsert={onMentionInsert} />
      <LinkPlugin />
    </EditorProvider>
  );
};
