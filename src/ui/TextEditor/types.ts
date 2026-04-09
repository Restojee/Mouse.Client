import type React from "react";
import type { Property } from "csstype";

export type TextFormat = {
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
};

export type TextNode = {
  type: "text";
  text: string;
  format?: TextFormat;
};

export type LinkNode = {
  type: "link";
  url: string;
  children: TextNode[];
};

export type MentionNode = {
  type: "mention";
  username: string;
};

export type SpoilerNode = {
  type: "spoiler";
  children: TextNode[];
};

export type InlineNode = TextNode | LinkNode | MentionNode | SpoilerNode;

export type ParagraphNode = {
  type: "paragraph";
  children: InlineNode[];
};

export type RootNode = {
  type: "root";
  children: ParagraphNode[];
};

// ─── Editor core ──────────────────────────────────────────────────────────────

export type EditorSelection = { start: number; end: number };

export type DecorationType = "mention" | "link" | "bold" | "italic" | "underline" | string;

export type Decoration = {
  start: number;
  end: number;
  type: DecorationType;
  style?: React.CSSProperties;
  data?: Record<string, unknown>;
};

export type EditorState = {
  value: string;
  selection: EditorSelection;
};

export type CommandHandler<P = unknown> = (payload: P, editor: Editor) => void;

export type EditorPlugin = {
  name: string;
  priority?: number;
  onInit?: (editor: Editor) => void;
  onDestroy?: (editor: Editor) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLElement>, editor: Editor) => boolean | void;
  onChange?: (state: EditorState, editor: Editor) => void;
  decorations?: (state: EditorState) => Decoration[];
  commands?: Record<string, CommandHandler>;
};

export type Editor = {
  getState(): EditorState;
  dispatch<P = unknown>(command: string, payload?: P): void;
  registerCommand<P = unknown>(name: string, handler: CommandHandler<P>): () => void;
  registerPlugin(plugin: EditorPlugin): () => void;
  getPlugins(): EditorPlugin[];
  insertText(text: string, at?: number): void;
  replaceRange(start: number, end: number, replacement: string): void;
  setSelection(selection: EditorSelection): void;
  getDiv(): HTMLDivElement | null;
};

export type EditorContextValue = {
  editor: Editor;
  state: EditorState;
  divRef: React.RefObject<HTMLDivElement>;
  /** Desired caret position after a programmatic editor.replaceRange/insertText call. */
  pendingCursorRef: React.MutableRefObject<number | null>;
};

// ─── Rendering ────────────────────────────────────────────────────────────────

export type Segment = {
  text: string;
  type: string | null;
  style?: React.CSSProperties;
  data?: Record<string, unknown>;
};

export type TextEditorProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  bgColor?: Property.BackgroundColor;
  height?: Property.Height;
  onMentionInsert?: (username: string, triggerStart: number) => void;
  children?: React.ReactNode;
};

export type EditorContentProps = {
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
  placeholder?: string;
  disabled?: boolean;
  onMentionInsert?: (username: string, triggerStart: number) => void;
  onSend?: () => void;
  sendDisabled?: boolean;
  style?: React.CSSProperties;
  className?: string;
};

export type EditorCanvasProps = {
  placeholder?: string;
  disabled?: boolean;
  onChange?: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLElement>) => void;
};

export type ToolbarItem = {
  label: string;
  title: string;
  command: string;
  payload?: unknown;
};

export type ToolbarPluginProps = {
  extraItems?: ToolbarItem[];
  visibleItems?: Array<"bold" | "italic" | "underline" | "link">;
  onSend?: () => void;
  sendDisabled?: boolean;
};

export type LinkPluginProps = {
  onLinkInsert?: (url: string) => void;
};

export type MentionPluginProps = {
  onInsert?: (username: string, triggerStart: number) => void;
};
