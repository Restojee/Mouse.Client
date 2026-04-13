import React, { useCallback, useMemo, useState } from "react";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useTag } from "@/modules/tag/hooks/useTag";

type UseCreateTagPopupProps = {
  onClose?: () => void;
};

export const useCreateTagPopup = ({ onClose }: UseCreateTagPopupProps) => {
  const { theme } = useAppTheme();
  const { onTagCreate } = useTag();
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const isValid = useMemo(() => Boolean(name.trim().length), [name]);
  const isSubmitDisabled = !isValid || isLoading;
  const submitIconColor = theme.colors.textOnPrimary;

  const onChangeHandler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  }, []);

  const onFormSubmit = useCallback(async () => {
    if (!isValid) return;
    setIsLoading(true);
    const res = await onTagCreate(name);
    if (res?.payload) {
      setName("");
      onClose?.();
    }
    setIsLoading(false);
  }, [isValid, onTagCreate, name, onClose]);

  return {
    name,
    isSubmitDisabled,
    submitIconColor,
    onChangeHandler,
    onFormSubmit,
  };
};
