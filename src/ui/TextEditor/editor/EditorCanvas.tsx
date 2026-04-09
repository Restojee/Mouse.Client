import React, { useCallback, useLayoutEffect } from "react";
import { useEditor } from "../core/EditorContext";
import { buildSegments } from "../core/buildSegments";
import { getSelectionOffsets, setSelectionOffsets } from "../core/cursor";
import type { EditorCanvasProps, Segment } from "../types";
import styles from "./EditorCanvas.module.css";

const escapeHtml = (str: string): string =>
  str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/\n/g, "<br>");

const styleToString = (style: React.CSSProperties): string =>
  Object.entries(style)
    .map(([k, v]) => `${k.replace(/([A-Z])/g, "-$1").toLowerCase()}:${v}`)
    .join(";");

const segmentToHtml = (seg: Segment): string => {
  const text = escapeHtml(seg.text);
  let style = "";
  if (seg.type === "mention") style = "color:var(--editor-brand);font-weight:bold";
  else if (seg.type === "link") style = "color:var(--editor-brand);text-decoration:underline";
  else if (seg.style) style = styleToString(seg.style);
  return style ? `<span style="${style}">${text}</span>` : `<span>${text}</span>`;
};

const segmentsToHtml = (segments: Segment[]): string => segments.map(segmentToHtml).join("");

export const EditorCanvas: React.FC<EditorCanvasProps> = ({
  placeholder,
  disabled,
  onChange,
  onKeyDown: externalKeyDown,
  onFocus,
}) => {
  const { editor, state, divRef, pendingCursorRef } = useEditor();

  useLayoutEffect(() => {
    const div = divRef.current;
    if (!div) return;

    const decs = editor
      .getPlugins()
      .flatMap((p) => p.decorations?.({ value: state.value, selection: state.selection }) ?? []);

    const html = state.value === "" ? "" : segmentsToHtml(buildSegments(state.value, decs));
    div.innerHTML = html;

    const cursor = pendingCursorRef.current;
    if (cursor !== null) {
      setSelectionOffsets(div, cursor, cursor);
      pendingCursorRef.current = null;
    }
  }, [state.value]);

  const notifyChange = useCallback(
    (newValue: string, cursorPos: number) => {
      const sel = { start: cursorPos, end: cursorPos };
      for (const plugin of editor.getPlugins()) {
        plugin.onChange?.({ value: newValue, selection: sel }, editor);
      }
      onChange?.(newValue);
    },
    [editor, onChange],
  );

  const handleInput = useCallback(() => {
    const div = divRef.current;
    if (!div) return;
    const newValue = div.textContent ?? "";
    const { end } = getSelectionOffsets(div);

    pendingCursorRef.current = end;
    notifyChange(newValue, end);
  }, [divRef, pendingCursorRef, notifyChange]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      for (const plugin of editor.getPlugins()) {
        if (plugin.onKeyDown?.(e as React.KeyboardEvent<HTMLElement>, editor)) {
          e.preventDefault();
          return;
        }
      }

      externalKeyDown?.(e);

      if (e.key === "Enter" && !e.defaultPrevented) {
        e.preventDefault();
        const div = divRef.current;
        if (!div) return;
        const { start, end } = getSelectionOffsets(div);
        const { value } = editor.getState();
        const newValue = value.slice(0, start) + "\n" + value.slice(end);
        pendingCursorRef.current = start + 1;
        notifyChange(newValue, start + 1);
      }
    },
    [editor, externalKeyDown, divRef, pendingCursorRef, notifyChange],
  );

  // Paste as plain text only.
  const handlePaste = useCallback(
    (e: React.ClipboardEvent<HTMLDivElement>) => {
      e.preventDefault();
      const text = e.clipboardData.getData("text/plain");
      if (!text) return;
      const div = divRef.current;
      if (!div) return;
      const { start, end } = getSelectionOffsets(div);
      const { value } = editor.getState();
      const newValue = value.slice(0, start) + text + value.slice(end);
      const newCursor = start + text.length;
      pendingCursorRef.current = newCursor;
      notifyChange(newValue, newCursor);
    },
    [editor, divRef, pendingCursorRef, notifyChange],
  );

  // Keep editor selection state in sync on cursor move / mouse click.
  const handleSelect = useCallback(() => {
    const div = divRef.current;
    if (!div) return;
    const sel = getSelectionOffsets(div);
    for (const plugin of editor.getPlugins()) {
      plugin.onChange?.({ value: state.value, selection: sel }, editor);
    }
  }, [divRef, editor, state.value]);

  return (
    <div className={styles.wrapper}>
      <div
        ref={divRef}
        className={`${styles.editor}${disabled ? ` ${styles.disabled}` : ""}`}
        contentEditable={!disabled}
        suppressContentEditableWarning
        onInput={handleInput}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onFocus={onFocus as React.FocusEventHandler<HTMLDivElement>}
        onSelect={handleSelect}
        data-placeholder={placeholder}
        role="textbox"
        aria-multiline="true"
      />
    </div>
  );
};
