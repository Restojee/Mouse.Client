import { AutocompleteItem } from "@/ui/AutoComplete/Autocomplete";

export interface TextEditorPlugin {
  readonly name: string;
}

export interface PluginDropdownState {
  pluginName: string;
  isOpen: boolean;
  isLoading: boolean;
  items: AutocompleteItem[];
  position: { top: number; left: number };
  activeIndex: number;
  onClose: () => void;
  onSelect: (item: AutocompleteItem) => void;
}

export interface AutocompletePlugin extends TextEditorPlugin {
  trigger: string;
  pattern?: RegExp;
  highlightPattern?: RegExp;
  onMatch: (query: string, position: { top: number; left: number }, triggerStart: number) => void;
  onDismiss?: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLTextAreaElement>) => boolean;
  getDropdownState: () => PluginDropdownState;
}
