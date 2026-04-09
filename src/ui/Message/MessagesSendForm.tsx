import { Display } from "@/ui/Display";
import React from "react";
import { useAppTheme } from "@/hooks/useAppTheme";
import { StyledBox } from "@/ui/Box";
import { StyledMessageDisabled } from "./styled";
import { EditorContent } from "@/ui/TextEditor/editor/EditorContent";

type PropsType = {
  disabled: boolean;
  value: string;
  isFetching?: boolean;
  bgColor: string;
  onSendClick: (e: React.MouseEvent<HTMLDivElement>) => void;
  onKeyUp: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  onFocus: (e: React.FocusEvent<HTMLElement>) => void;
  onMentionInsert?: (username: string, triggerStart: number) => void;
};

export const MessageSendFormContainer = (props: Partial<PropsType>) => {
  const { value, onSendClick, onChange, onFocus, onKeyUp, disabled, isFetching, onMentionInsert } = props;
  const { theme } = useAppTheme();

  const editorStyle = {
    ["--editor-bg"]: theme.colors.input.default,
    ["--editor-bg-hover"]: theme.colors.input.hover,
    ["--editor-border"]: theme.colors.input.border,
    ["--editor-border-focus"]: theme.colors.secondaryAccent,
    ["--editor-color"]: theme.colors.textOnSecondary,
    ["--editor-placeholder"]: theme.colors.secondaryAccent,
    ["--editor-brand"]: theme.colors.brandColor,
    ["--editor-toolbar-bg"]: theme.colors.secondaryDark,
    ["--editor-toolbar-icon"]: theme.colors.iconOnSecondary,
    ["--editor-font-size"]: theme.font.fontSize,
    width: "100%",
  };

  const sendDisabled = Boolean(!value?.trim().length) || Boolean(isFetching);

  const handleSend = () => {
    if (sendDisabled) return;
    onSendClick?.({} as React.MouseEvent<HTMLDivElement>);
  };

  return (
    <StyledBox
      align={"center"}
      margin={"auto 0 0 0"}
      width={"100%"}
      position={"relative"}
    >
      <Display condition={disabled}>
        <StyledMessageDisabled>Вы не авторизованы</StyledMessageDisabled>
      </Display>

      <div style={{ ...editorStyle, flex: 1, minWidth: 0 }}>
        <EditorContent
          onChange={onChange}
          onKeyDown={onKeyUp}
          onFocus={onFocus}
          value={value}
          placeholder={disabled ? "" : "Введите сообщение..."}
          disabled={disabled}
          onMentionInsert={onMentionInsert}
          onSend={disabled ? undefined : handleSend}
          sendDisabled={sendDisabled}
        />
      </div>
    </StyledBox>
  );
};
