import React, { useCallback, useState, useMemo } from "react";
import { Avatar } from "@/ui/Avatar";
import listStyles from "./List.module.scss";
import contextMenuStyles from "@/ui/ContextMenu/ContextMenu.module.scss";
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
  showCheckbox: _showCheckbox = false,
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
    [onChange],
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
    <div className={[listStyles.list, className].filter(Boolean).join(" ")}>
      {showSearch ? (
        <div className={listStyles.listSearch}>
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
        </div>
      ) : null}
      <div ref={itemsContainerRef}>
        {isLoading ? (
          <div className={listStyles.listLoader} />
        ) : filteredOptions.length === 0 ? (
          <div className={[listStyles.listEmpty, size === "sm" && listStyles.listEmptySm].filter(Boolean).join(" ")}>
            {emptyMessage}
          </div>
        ) : (
          filteredOptions.map((option) => (
            <React.Fragment key={option.id}>
              {option.divider ? <div className={contextMenuStyles.divider} /> : null}
              <div
                onClick={() => !option.disabled && handleClick(option)}
                className={[
                  contextMenuStyles.option,
                  option.disabled && contextMenuStyles.optionDisabled,
                  option.isDanger && contextMenuStyles.optionDanger,
                ]
                  .filter(Boolean)
                  .join(" ")}
                data-active={activeItemId != null && option.id === activeItemId}
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
        {sentinelRef?.current ? (
          <div
            ref={sentinelRef}
            style={{ height: "1px", width: "100%" }}
          />
        ) : null}
      </div>
    </div>
  );
};

export default List;
