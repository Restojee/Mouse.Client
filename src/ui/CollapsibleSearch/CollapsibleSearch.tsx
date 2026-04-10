import * as React from "react";
import styled from "styled-components";
import { SearchIcon } from "@/svg/SearchIcon";
import { IconButton } from "@/ui/Button/IconButton";
import { Input } from "@/ui/Input";

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

export const CollapsibleSearch: React.FC<Props> = ({
  value = "",
  onChange,
  onKeyDown,
  onOpenChange,
  placeholder = "Поиск...",
  alwaysOpen = false,
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const inputRef = React.useRef<HTMLInputElement>(null);

  const toggle = React.useCallback(() => {
    if (alwaysOpen) return;
    setIsOpen((prev) => {
      const next = !prev;
      onOpenChange?.(next);
      if (next) {
        inputRef.current?.focus();
      } else {
        onChange("");
      }
      return next;
    });
  }, [alwaysOpen, onChange, onOpenChange]);

  const onBlur = React.useCallback(() => {
    if (alwaysOpen) return;
    if (!value) {
      setIsOpen(false);
      onOpenChange?.(false);
    }
  }, [alwaysOpen, value, onOpenChange]);

  const onInputChange = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onChange(e.currentTarget.value);
    },
    [onChange],
  );

  const resolvedOpen = isOpen || alwaysOpen;

  return (
    <Wrapper>
      <div
        style={{
          width: resolvedOpen ? 215 : 0,
          opacity: resolvedOpen ? 1 : 0,
          overflow: "hidden",
          transition: "width 0.25s ease, opacity 0.2s ease",
          pointerEvents: resolvedOpen ? "auto" : "none",
        }}
      >
        <Input
          ref={inputRef}
          value={value}
          onChange={onInputChange}
          onKeyDown={onKeyDown}
          onFocus={() => {}}
          onBlur={onBlur}
          placeholder={placeholder}
          autoComplete="off"
          name="collapsible-search"
          noBorder
          compact
          width="auto"
        />
      </div>
      <IconButton
        opacity={resolvedOpen ? "1" : "0.6"}
        onClick={toggle}
      >
        <SearchIcon />
      </IconButton>
    </Wrapper>
  );
};
