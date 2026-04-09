import React, { useCallback, useState, useMemo } from "react";
import { Avatar } from "@/ui/Avatar";
import { StyledList, StyledListSearch, StyledListEmpty, StyledListLoader } from "./styled";
import { ThemeSizes, ListItemOptions } from "@/ui/ContextMenu/ContextMenuItem";

type ListProps = {
  options: ListItemOptions[];
  onChange?: (option: ListItemOptions) => void;
  size?: ThemeSizes;
  showCheckbox?: boolean;
  showSearch?: boolean;
  placeholder?: string;
  emptyMessage?: string;
  isLoading?: boolean;
  className?: string;
  onSearch?: (value: string) => void;
  sentinelRef?: React.RefObject<HTMLDivElement>;
  itemsContainerRef?: React.RefObject<HTMLDivElement>;
  activeItemId?: string | number | null;
};

export const List: React.FC<ListProps> = ({
  options,
  onChange,
  size = "sm",
  showCheckbox = false,
  showSearch = false,
  placeholder = "Поиск...",
  emptyMessage = "Ничего не найдено",
  isLoading = false,
  className,
  onSearch,
  sentinelRef,
  itemsContainerRef,
  activeItemId,
}) => {
  const [searchValue, setSearchValue] = useState("");

  const handleClick = useCallback(
    (option: ListItemOptions) => {
      onChange?.(option);
    },
    [onChange, showCheckbox],
  );

  const handleSearchChange = useCallback(
    (value: string) => {
      setSearchValue(value);
      onSearch?.(value);
    },
    [onSearch],
  );

  const filteredOptions = useMemo(() => {
    if (!searchValue) return options;
    const lower = searchValue.toLowerCase();
    return options.filter((opt) => opt.label.toLowerCase().includes(lower));
  }, [options, searchValue]);

  return (
    <StyledList className={className}>
      {showSearch && (
        <StyledListSearch>
          <input
            value={searchValue}
            onChange={(e) => handleSearchChange(e.target.value)}
            placeholder={placeholder}
            style={{
              width: "100%",
              padding: size === "sm" ? "4px 8px" : "6px 10px",
              fontSize: size === "sm" ? "0.85rem" : "0.95rem",
              border: "1px solid var(--border-color, rgba(0,0,0,0.1))",
              borderRadius: "8px",
              outline: "none",
              background: "transparent",
              color: "inherit",
            }}
          />
        </StyledListSearch>
      )}
      <div ref={itemsContainerRef}>
        {isLoading ? (
          <StyledListLoader />
        ) : filteredOptions.length === 0 ? (
          <StyledListEmpty size={size}>{emptyMessage}</StyledListEmpty>
        ) : (
          filteredOptions.map((option) => (
            <React.Fragment key={option.id}>
              {option.divider && (
                <div style={{ height: 1, background: "var(--border-color, rgba(0,0,0,0.1))", margin: "4px 0" }} />
              )}
              <div
                onClick={() => !option.disabled && handleClick(option)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  padding: size === "sm" ? "6px 14px" : "8px 14px",
                  fontSize: size === "sm" ? "0.85rem" : "0.95rem",
                  cursor: option.disabled ? "default" : "pointer",
                  opacity: option.disabled ? 0.5 : 1,
                  transition: "background-color 0.1s",
                  backgroundColor:
                    activeItemId != null && option.id === activeItemId
                      ? "var(--paper-accent, rgba(0,0,0,0.08))"
                      : "transparent",
                }}
                onMouseEnter={(e) => {
                  if (!option.disabled && option.id !== activeItemId) {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = "var(--paper-accent, rgba(0,0,0,0.05))";
                  }
                }}
                onMouseLeave={(e) => {
                  if (option.id !== activeItemId) {
                    (e.currentTarget as HTMLDivElement).style.backgroundColor = "transparent";
                  }
                }}
              >
                {option.avatar !== undefined ? (
                  <Avatar
                    size={28}
                    image={option.avatar || undefined}
                    username={option.label}
                  />
                ) : option.icon ? (
                  <span>{option.icon}</span>
                ) : null}
                {option.label}
              </div>
            </React.Fragment>
          ))
        )}
        {sentinelRef?.current && (
          <div
            ref={sentinelRef}
            style={{ height: "1px", width: "100%" }}
          />
        )}
      </div>
    </StyledList>
  );
};

export default List;
