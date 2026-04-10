import * as React from "react";
import styled from "styled-components";
import { SearchIcon } from "@/svg/SearchIcon";
import { IconButton } from "@/ui/Button/IconButton";

type Props = {
  value?: string;
  onChange: (value: string) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onOpenChange?: (isOpen: boolean) => void;
  placeholder?: string;
  /** Always show the input expanded, never collapsible. Useful on desktop. */
  alwaysOpen?: boolean;
};

const Wrapper = styled.div({
  display: "flex",
  alignItems: "center",
  gap: 4,
  position: "relative",
});

const SearchInput = styled.input<{ isOpen: boolean; isFocused: boolean }>(({ theme, isOpen, isFocused }) => ({
  width: isOpen ? 215 : 0,
  opacity: isOpen ? 1 : 0,
  padding: isOpen ? "4px 0 7px" : 0,
  border: "none",
  // Черта появляется на 3px ниже текста (за счёт padding-bottom) и только при фокусе
  borderBottom: isFocused ? `1px solid ${theme.colors.input.border}` : "1px solid transparent",
  borderRadius: 0,
  outline: "none",
  fontSize: "0.9rem",
  backgroundColor: "transparent",
  color: "inherit",
  transition: "width 0.25s ease, opacity 0.2s ease",
  pointerEvents: isOpen ? "auto" : "none",
  "::placeholder": {
    color: theme.colors.disabled,
  },
}));

export const CollapsibleSearch: React.FC<Props> = ({
  value = "",
  onChange,
  onKeyDown,
  onOpenChange,
  placeholder = "Поиск...",
  alwaysOpen = false,
}) => {
  // Always init to false — avoids SSR/hydration bug where alwaysOpen
  // is temporarily false before window width is measured.
  // The rendered output already uses `isOpen || alwaysOpen` so desktop
  // (alwaysOpen=true) renders correctly regardless of this state.
  const [isOpen, setIsOpen] = React.useState(false);
  const [isFocused, setIsFocused] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const toggle = React.useCallback(() => {
    if (alwaysOpen) return;
    setIsOpen((prev) => {
      const next = !prev;
      onOpenChange?.(next);
      if (next) {
        // autoFocus: focus immediately when the input expands
        requestAnimationFrame(() => inputRef.current?.focus());
      } else {
        onChange("");
      }
      return next;
    });
  }, [alwaysOpen, onChange, onOpenChange]);

  const onBlur = React.useCallback(() => {
    setIsFocused(false);
    if (alwaysOpen) return;
    if (!value) {
      setIsOpen(false);
      onOpenChange?.(false);
    }
  }, [alwaysOpen, value, onOpenChange]);

  const onFocus = React.useCallback(() => {
    setIsFocused(true);
  }, []);

  const onInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.currentTarget.value);
    },
    [onChange],
  );

  const resolvedOpen = isOpen || alwaysOpen;

  return (
    <Wrapper>
      <SearchInput
        ref={inputRef}
        isOpen={resolvedOpen}
        isFocused={isFocused}
        value={value}
        onChange={onInputChange}
        onKeyDown={onKeyDown}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        autoComplete="off"
        name="collapsible-search"
      />
      <IconButton
        opacity={resolvedOpen ? "1" : "0.6"}
        onClick={toggle}
      >
        <SearchIcon />
      </IconButton>
    </Wrapper>
  );
};
