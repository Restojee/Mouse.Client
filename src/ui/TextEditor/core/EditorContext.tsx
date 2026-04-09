import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { setSelectionOffsets } from "./cursor";
import type { CommandHandler, Editor, EditorContextValue, EditorPlugin, EditorSelection, EditorState } from "../types";

const EditorContext = createContext<EditorContextValue | null>(null);

export const useEditor = (): EditorContextValue => {
  const ctx = useContext(EditorContext);
  if (!ctx) throw new Error("[TextEditor] useEditor() must be called inside <TextEditor>.");
  return ctx;
};

export const useRegisterPlugin = (plugin: EditorPlugin): void => {
  const { editor } = useEditor();
  const pluginRef = useRef(plugin);
  pluginRef.current = plugin;

  useEffect(() => {
    const proxy: EditorPlugin = {
      get name() {
        return pluginRef.current.name;
      },
      get priority() {
        return pluginRef.current.priority;
      },
      onInit: (e) => pluginRef.current.onInit?.(e),
      onDestroy: (e) => pluginRef.current.onDestroy?.(e),
      onKeyDown: (ev, e) => pluginRef.current.onKeyDown?.(ev, e),
      onChange: (s, e) => pluginRef.current.onChange?.(s, e),
      decorations: (s) => pluginRef.current.decorations?.(s) ?? [],
      get commands() {
        return pluginRef.current.commands;
      },
    };
    return editor.registerPlugin(proxy);
  }, [editor]);
};

const createEditorInstance = (
  stateRef: React.MutableRefObject<EditorState>,
  onChangeRef: React.MutableRefObject<((value: string) => void) | undefined>,
  divRef: React.RefObject<HTMLDivElement>,
  pluginsMap: React.MutableRefObject<Map<string, EditorPlugin>>,
  commandsMap: React.MutableRefObject<Map<string, CommandHandler>>,
  pendingCursorRef: React.MutableRefObject<number | null>,
): Editor => {
  const applyChange = (newValue: string, newCursor: number): void => {
    pendingCursorRef.current = newCursor;
    onChangeRef.current?.(newValue);
  };

  const editor: Editor = {
    getState: () => stateRef.current,

    dispatch(command, payload) {
      const handler = commandsMap.current.get(command);
      if (handler) {
        handler(payload, editor);
      } else {
        console.warn(`[TextEditor] No handler for command "${command}".`);
      }
    },

    registerCommand(name, handler) {
      commandsMap.current.set(name, handler as CommandHandler);
      return () => {
        commandsMap.current.delete(name);
      };
    },

    registerPlugin(plugin) {
      pluginsMap.current.set(plugin.name, plugin);
      const commandNames: string[] = [];
      if (plugin.commands) {
        for (const [name, handler] of Object.entries(plugin.commands)) {
          commandsMap.current.set(name, handler as CommandHandler);
          commandNames.push(name);
        }
      }
      plugin.onInit?.(editor);
      return () => {
        plugin.onDestroy?.(editor);
        pluginsMap.current.delete(plugin.name);
        for (const name of commandNames) commandsMap.current.delete(name);
      };
    },

    getPlugins: () => Array.from(pluginsMap.current.values()).sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0)),

    insertText(text, at) {
      const { value, selection } = stateRef.current;
      const pos = at ?? selection.start;
      applyChange(value.slice(0, pos) + text + value.slice(pos), pos + text.length);
    },

    replaceRange(start, end, replacement) {
      const { value } = stateRef.current;
      applyChange(value.slice(0, start) + replacement + value.slice(end), start + replacement.length);
    },

    setSelection(sel) {
      requestAnimationFrame(() => {
        const div = divRef.current;
        if (!div) return;
        setSelectionOffsets(div, sel.start, sel.end);
      });
    },

    getDiv: () => divRef.current,
  };

  return editor;
};

type EditorProviderProps = {
  value: string;
  onChange?: (value: string) => void;
  divRef: React.RefObject<HTMLDivElement>;
  children: React.ReactNode;
};

export const EditorProvider = ({ value, onChange, divRef, children }: EditorProviderProps) => {
  const [selection, setSelection] = useState<EditorSelection>({ start: 0, end: 0 });
  const state: EditorState = useMemo(() => ({ value, selection }), [value, selection]);

  const stateRef = useRef(state);
  stateRef.current = state;

  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;

  const pluginsMap = useRef<Map<string, EditorPlugin>>(new Map());
  const commandsMap = useRef<Map<string, CommandHandler>>(new Map());
  const pendingCursorRef = useRef<number | null>(null);

  const editor = useRef<Editor>(
    createEditorInstance(stateRef, onChangeRef, divRef, pluginsMap, commandsMap, pendingCursorRef),
  ).current;

  const updateSelection = useCallback((sel: EditorSelection) => {
    setSelection(sel);
  }, []);

  const contextValue = useMemo<EditorContextValue>(
    () => ({ editor, state, divRef, pendingCursorRef }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [editor, state],
  );

  return (
    <EditorContext.Provider value={contextValue}>
      <SelectionUpdaterContext.Provider value={updateSelection}>{children}</SelectionUpdaterContext.Provider>
    </EditorContext.Provider>
  );
};

const SelectionUpdaterContext = createContext<((sel: EditorSelection) => void) | null>(null);

export const useSelectionUpdater = (): ((sel: EditorSelection) => void) => {
  const fn = useContext(SelectionUpdaterContext);
  if (!fn) throw new Error("[TextEditor] useSelectionUpdater() must be inside <TextEditor>.");
  return fn;
};
