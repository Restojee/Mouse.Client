import React, { useCallback, useRef, useState } from "react";
import styles from "./styles.module.scss";

type EditableTextProps = {
  value: string;
  onChange: (value: string) => void;
  onSave: () => void | Promise<void>;
  onCancel: () => void;
  ariaLabel?: string;
  disabled?: boolean;
  className?: string;
};

export const EditableText: React.FC<EditableTextProps> = ({
  value,
  onChange,
  onSave,
  onCancel,
  ariaLabel,
  disabled,
  className,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const editableRef = useRef<HTMLDivElement | null>(null);

  const startEdit = useCallback(() => {
    if (disabled || isEditing) return;
    setIsEditing(true);
    setTimeout(() => {
      // Инициализируем текст и ставим курсор в конец перед фокусом
      if (editableRef.current) {
        editableRef.current.textContent = value || "";
        // Фокус без изменения текущей позиции каретки (по клику пользователя)
        editableRef.current.focus();
        // Явно ставим каретку в конец содержимого
        const selection = window.getSelection();
        if (selection) {
          const range = document.createRange();
          range.selectNodeContents(editableRef.current);
          range.collapse(false);
          selection.removeAllRanges();
          selection.addRange(range);
        }
      }
    }, 0);
  }, [disabled, isEditing, value]);

  const stopEditAndSave = useCallback(async () => {
    setIsEditing(false);
    if (disabled) return;
    await onSave();
    onChange(value);
  }, [disabled, onSave, onChange, value]);

  const onEditableInput = useCallback(
    (e: React.FormEvent<HTMLDivElement>) => {
      const text = e.currentTarget.textContent || "";
      onChange(text);
    },
    [onChange],
  );

  const onEditableKeyDown = useCallback(
    async (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (disabled) return;
      if (e.key === "Enter") {
        e.preventDefault();
        await stopEditAndSave();
      } else if (e.key === "Escape") {
        e.preventDefault();
        setIsEditing(false);
        onCancel();
      }
    },
    [stopEditAndSave, onCancel, disabled],
  );

  return (
    <div
      ref={editableRef}
      role="textbox"
      aria-label={ariaLabel}
      contentEditable={isEditing && !disabled}
      suppressContentEditableWarning
      onClick={startEdit}
      onInput={onEditableInput}
      onBlur={stopEditAndSave}
      onKeyDown={onEditableKeyDown}
      className={`${styles.editable} ${isEditing ? styles.editing : ""} ${disabled ? styles.disabled : ""} ${className || ""}`}
    >
      {/* Во время редактирования не рендерим значение как children,
          чтобы React не трогал DOM и не сбрасывал каретку */}
      {!isEditing ? value : null}
    </div>
  );
};
