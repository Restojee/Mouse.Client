import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppTheme } from "@/hooks/useAppTheme";
import { selectIsAuth } from "@/modules/auth/slice";
import { AddRoundIcon } from "@/svg/AddRoundIcon";
import { Button } from "@/ui/Button";
import { Display } from "@/ui/Display";
import { StyledBox } from "@/ui/Box";
import { useState } from "react";
import { useMapCreate } from "../hooks/useMapCreate";
import { MapCreatePopup } from "./MapCreatePopup";

export const MapCreateSection = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const isAuth = useAppSelector(selectIsAuth);
  const { theme } = useAppTheme();

  const { name, setName, onMapCreate } = useMapCreate();
  const { isValid } = useMapCreate();

  const onSubmitHandler = async () => {
    try {
      setIsLoading(true);
      await onMapCreate();
    } finally {
      setIsLoading(false);
    }
  };

  const onIconClickHandler = async () => {
    if (!isContentVisible) {
      setIsContentVisible(true);
      setIsPopupOpen(false);
    }
  };

  const isSubmitDisabled = isLoading || !isValid || !isAuth;

  return (
    <StyledBox
      align="center"
      gap={10}
    >
      <Display condition={isContentVisible}>
        <MapCreatePopup
          name={name}
          setName={setName}
          isVisible={isPopupOpen}
          onImagePopupToggle={() => setIsPopupOpen(!isPopupOpen)}
          onMapCreate={onSubmitHandler}
        />
      </Display>

      <Display condition={isContentVisible}>
        <Button
          bgColor={theme.colors.status.success}
          color={theme.colors.brandColorContrastText}
          onClick={onSubmitHandler}
          disabled={isSubmitDisabled}
          size="sm"
          padding="8px 8px"
        >
          <AddRoundIcon />
        </Button>
      </Display>

      <Display condition={!isContentVisible}>
        <Button
          disabled={!isAuth}
          onClick={onIconClickHandler}
          size="sm"
          bgColor={theme.colors.neutral}
          color={theme.colors.textOnSecondary}
        >
          <AddRoundIcon />
        </Button>
      </Display>
    </StyledBox>
  );
};
