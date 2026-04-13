import { Display } from "@/ui/Display";
import React, { useCallback } from "react";
import { Box } from "@/ui/Box";
import messageStyles from "./Message.module.scss";
import { RichEditor } from "@/ui/RichEditor";
import { userMentionSuggestion } from "@/ui/RichEditor/userMentionSuggestion";
import { levelMentionSuggestion } from "@/ui/RichEditor/level/levelMentionSuggestion";

type PropsType = {
  disabled: boolean;
  value: string;
  isFetching?: boolean;
  onChange: (value: string) => void;
  onFocus?: () => void;
  onSendClick: () => void;
};

export const MessageSendFormContainer = (props: Partial<PropsType>) => {
  const { value, onSendClick, onChange, onFocus, disabled, isFetching } = props;

  const sendDisabled = Boolean(!value?.trim().length) || Boolean(isFetching);

  const handleSend = useCallback(() => {
    if (sendDisabled || disabled) return;
    onSendClick?.();
  }, [onSendClick, sendDisabled, disabled]);

  return (
    <Box
      align="center"
      margin="auto 0 0 0"
      padding="15px 10px"
      width="100%"
      position="relative"
    >
      <Display condition={disabled}>
        <div className={messageStyles.messageDisabled}>Вы не авторизованы</div>
      </Display>
      <div style={{ flex: 1, minWidth: 0, width: "100%" }}>
        <RichEditor
          value={value}
          onChange={onChange}
          onFocus={onFocus}
          placeholder={"Введите сообщение..."}
          disabled={disabled}
          mention={userMentionSuggestion}
          levelMention={levelMentionSuggestion}
          onSend={disabled ? undefined : handleSend}
          sendDisabled={sendDisabled}
        />
      </div>
    </Box>
  );
};
