export { TextEditor } from "./editor/TextEditor";
export { EditorContent } from "./editor/EditorContent";

export { renderRichContent } from "./renderRichContent";
export type { RichContentCallbacks } from "./renderRichContent";

export { parseText, htmlToMarkup } from "./model";
export type { RootNode, ParagraphNode, InlineNode, TextNode, LinkNode, MentionNode, SpoilerNode } from "./model";

export { useEditor, useRegisterPlugin } from "./core/EditorContext";

export type {
  Editor,
  EditorPlugin,
  EditorState,
  EditorSelection,
  EditorContextValue,
  Decoration,
  DecorationType,
  CommandHandler,
  TextFormat,
  TextEditorProps,
  EditorContentProps,
  ToolbarPluginProps,
} from "./types";

export { MentionPlugin } from "./plugins/mention/MentionPlugin";
export { LinkPlugin } from "./plugins/link/LinkPlugin";
export { ToolbarPlugin } from "./plugins/toolbar/ToolbarPlugin";
export { MentionText } from "./plugins/mention/MentionText";

export { useMentionPlugin } from "./plugins/mention/useMentionPlugin";
export { MENTION_PATTERN, splitMentions } from "./plugins/mention/useMentionPlugin";
export type { AutocompletePlugin, TextEditorPlugin, PluginDropdownState } from "./core/plugins";
