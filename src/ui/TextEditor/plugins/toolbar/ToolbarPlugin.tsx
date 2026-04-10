import React, { useCallback, useRef, useState } from "react";
import { useEditor, useRegisterPlugin } from "../../core/EditorContext";
import { AsyncSheet as Modal } from "@/ui/Sheet/view";
import { Input } from "@/ui/Input/Input";
import { BoldIcon } from "@/svg/BoldIcon";
import { ItalicIcon } from "@/svg/ItalicIcon";
import { UnderlineIcon } from "@/svg/UnderlineIcon";
import { LinkIcon } from "@/svg/LinkIcon";
import { ChevronRightIcon } from "@/svg/ChevronRightIcon";
import { SendIcon } from "@/svg/SendIcon";
import { ContextMenu } from "@/ui/ContextMenu/ContextMenu";
import { AnchorAlign, PopupPosition } from "@/ui/Popup";
import type { ListItemOptions } from "@/ui/ContextMenu/ContextMenuItem";
import type { Decoration, EditorPlugin, EditorState, ToolbarPluginProps } from "../../types";
import styles from "./ToolbarPlugin.module.css";

const HIDDEN: React.CSSProperties = { fontSize: 0 };

type FormatRule = {
  open: string;
  close: string;
  re: RegExp;
  style: React.CSSProperties;
};

const FORMAT_RULES: FormatRule[] = [
  { open: "[b]", close: "[/b]", re: /\[b\]([\s\S]*?)\[\/b\]/gi, style: { fontWeight: "bold" } },
  { open: "[i]", close: "[/i]", re: /\[i\]([\s\S]*?)\[\/i\]/gi, style: { fontStyle: "italic" } },
  { open: "[u]", close: "[/u]", re: /\[u\]([\s\S]*?)\[\/u\]/gi, style: { textDecoration: "underline" } },
];

const buildFormatDecorations = (value: string): Decoration[] => {
  const decorations: Decoration[] = [];
  for (const rule of FORMAT_RULES) {
    const re = new RegExp(rule.re.source, "gi");
    let m: RegExpExecArray | null;
    while ((m = re.exec(value)) !== null) {
      const fullStart = m.index;
      const fullEnd = fullStart + m[0].length;
      const openLen = rule.open.length;
      const closeLen = rule.close.length;
      const contentStart = fullStart + openLen;
      const contentEnd = fullEnd - closeLen;

      // hide opening tag
      decorations.push({ start: fullStart, end: contentStart, type: "format-tag", style: HIDDEN });
      // style the content
      decorations.push({ start: contentStart, end: contentEnd, type: "format-content", style: rule.style });
      // hide closing tag
      decorations.push({ start: contentEnd, end: fullEnd, type: "format-tag", style: HIDDEN });
    }
  }
  return decorations;
};

type Props = ToolbarPluginProps & {
  onSend?: () => void;
  sendDisabled?: boolean;
  isFocused?: boolean;
};

export const ToolbarPlugin: React.FC<Props> = ({ onSend, sendDisabled, isFocused }) => {
  const { editor, divRef } = useEditor();
  const [menuOpen, setMenuOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const savedSelectionRef = useRef<{ start: number; end: number } | null>(null);

  const saveSelection = useCallback(() => {
    const div = divRef.current;
    if (!div) return;
    // Read selection from the live Selection API before the div loses focus.
    const sel = window.getSelection();
    if (!sel || !sel.rangeCount) return;
    const range = sel.getRangeAt(0);
    const getOffset = (container: Node, offset: number): number => {
      const r = document.createRange();
      r.selectNodeContents(div);
      r.setEnd(container, offset);
      return r.toString().length;
    };
    savedSelectionRef.current = {
      start: getOffset(range.startContainer, range.startOffset),
      end: getOffset(range.endContainer, range.endOffset),
    };
  }, [divRef]);

  const wrap = useCallback(
    (openTag: string, closeTag: string) => {
      const { value } = editor.getState();
      const sel = savedSelectionRef.current;
      const start = sel?.start ?? editor.getState().selection.start;
      const end = sel?.end ?? editor.getState().selection.end;
      savedSelectionRef.current = null;
      const selected = value.slice(start, end);
      const replacement = openTag + selected + closeTag;
      editor.replaceRange(start, end, replacement);
    },
    [editor],
  );

  const handleBold = useCallback(() => wrap("[b]", "[/b]"), [wrap]);
  const handleItalic = useCallback(() => wrap("[i]", "[/i]"), [wrap]);
  const handleUnderline = useCallback(() => wrap("[u]", "[/u]"), [wrap]);

  const handleLinkOpen = useCallback(() => {
    setLinkUrl("");
    setLinkModalOpen(true);
  }, []);

  const handleLinkConfirm = useCallback(() => {
    if (!linkUrl.trim()) return;
    setLinkModalOpen(false);
    editor.dispatch("WRAP_LINK", {
      url: linkUrl.trim(),
      selectionStart: savedSelectionRef.current?.start,
      selectionEnd: savedSelectionRef.current?.end,
    });
    savedSelectionRef.current = null;
    setLinkUrl("");
  }, [editor, linkUrl]);

  const handleLinkClose = useCallback(() => {
    setLinkModalOpen(false);
    setLinkUrl("");
  }, []);

  const menuItems: ListItemOptions[] = [
    { id: "bold", label: "Жирный", icon: <BoldIcon size="14px" /> },
    { id: "italic", label: "Курсив", icon: <ItalicIcon size="14px" /> },
    { id: "underline", label: "Подчёркнутый", icon: <UnderlineIcon size="14px" /> },
    { id: "link", label: "Вставить ссылку", icon: <LinkIcon size="14px" /> },
  ];

  const handleMenuChange = useCallback(
    (option: ListItemOptions) => {
      setMenuOpen(false);
      switch (option.id) {
        case "bold":
          handleBold();
          break;
        case "italic":
          handleItalic();
          break;
        case "underline":
          handleUnderline();
          break;
        case "link":
          handleLinkOpen();
          break;
      }
    },
    [handleBold, handleItalic, handleUnderline, handleLinkOpen],
  );

  const plugin: EditorPlugin = {
    name: "toolbar",

    onKeyDown(e) {
      const isMod = e.ctrlKey || e.metaKey;
      if (isMod && (e.key === "b" || e.key === "B")) {
        handleBold();
        return true;
      }
      if (isMod && (e.key === "i" || e.key === "I")) {
        handleItalic();
        return true;
      }
      if (isMod && (e.key === "u" || e.key === "U")) {
        handleUnderline();
        return true;
      }
      return false;
    },

    decorations(state: EditorState): Decoration[] {
      return buildFormatDecorations(state.value);
    },
  };
  useRegisterPlugin(plugin);

  const anchor = (
    <button
      ref={toggleBtnRef}
      className={styles.toggleBtn}
      type="button"
      onMouseDown={(e) => {
        saveSelection();
        e.preventDefault();
      }}
      onClick={() => setMenuOpen((v) => !v)}
      title="Форматирование"
    >
      <ChevronRightIcon
        size="14px"
        style={{ transform: menuOpen ? "rotate(90deg)" : "rotate(0deg)", transition: "transform 0.15s" }}
      />
    </button>
  );

  return (
    <>
      <div
        className={styles.toolbar}
        role="toolbar"
        aria-label="Панель форматирования"
      >
        <ContextMenu
          anchor={anchor}
          items={menuItems}
          isOpen={menuOpen}
          onClose={() => setMenuOpen(false)}
          onChange={handleMenuChange}
          position={PopupPosition.TOP}
          anchorAlign={AnchorAlign.START}
          minWidth={180}
        />
        {onSend && (
          <button
            className={[
              styles.sendBtn,
              sendDisabled && !isFocused ? styles.sendBtnHidden : "",
              sendDisabled ? styles.sendBtnDisabled : "",
            ]
              .filter(Boolean)
              .join(" ")}
            type="button"
            onClick={onSend}
            disabled={sendDisabled}
            title="Отправить"
          >
            <SendIcon size="36px" />
          </button>
        )}
      </div>
      <Modal
        isOpen={linkModalOpen}
        onClose={handleLinkClose}
        onAccess={handleLinkConfirm}
        accessDisabled={!linkUrl.trim()}
        title="Вставить ссылку"
        width={360}
      >
        <Input
          placeholder="https://"
          value={linkUrl}
          onChange={(e) => setLinkUrl(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleLinkConfirm();
            }
          }}
          autoFocus
        />
      </Modal>
    </>
  );
};
