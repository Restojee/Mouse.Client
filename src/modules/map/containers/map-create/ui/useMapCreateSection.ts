import { useCallback, useState } from "react";
import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppTheme } from "@/hooks/useAppTheme";
import { selectIsAuth } from "@/modules/auth/slice";
import { useMapCreate } from "../hooks/useMapCreate";

type UseMapCreateSectionProps = {
  defaultExpanded?: boolean;
};

export const useMapCreateSection = ({ defaultExpanded = false }: UseMapCreateSectionProps) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(defaultExpanded);
  const [isLoading, setIsLoading] = useState(false);

  const isAuth = useAppSelector(selectIsAuth);
  const { theme } = useAppTheme();
  const { name, setName, onMapCreate, isValid } = useMapCreate();

  const onSubmitHandler = useCallback(async () => {
    try {
      setIsLoading(true);
      await onMapCreate();
    } finally {
      setIsLoading(false);
    }
  }, [onMapCreate]);

  const onIconClickHandler = useCallback(() => {
    if (!isContentVisible) {
      setIsContentVisible(true);
      setIsPopupOpen(false);
    }
  }, [isContentVisible]);

  const onImagePopupToggle = useCallback(() => {
    setIsPopupOpen((prev) => !prev);
  }, []);

  const isSubmitDisabled = isLoading || !isValid || !isAuth;
  const submitIconColor = theme.colors.textOnPrimary;
  const toggleIconColor = theme.colors.textOnSecondary;

  return {
    name,
    setName,
    isPopupOpen,
    isContentVisible,
    isAuth,
    isSubmitDisabled,
    submitIconColor,
    toggleIconColor,
    onSubmitHandler,
    onIconClickHandler,
    onImagePopupToggle,
  };
};
