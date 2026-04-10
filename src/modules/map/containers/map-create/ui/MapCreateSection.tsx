import { useAppSelector } from "@/hooks/useAppSelector";
import { useAppTheme } from "@/hooks/useAppTheme";
import { selectIsAuth } from "@/modules/auth/slice";
import { AddRoundIcon } from "@/svg/AddRoundIcon";
import { Display } from "@/ui/Display";
import { StyledBox } from "@/ui/Box";
import { useState } from "react";
import { useMapCreate } from "../hooks/useMapCreate";
import { MapCreatePopup } from "./MapCreatePopup";
import { IconButton } from "@/ui/Button/IconButton";

type Props = {
  defaultExpanded?: boolean;
};

export const MapCreateSection = ({ defaultExpanded = false }: Props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isContentVisible, setIsContentVisible] = useState(defaultExpanded);
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
        <IconButton
          color={theme.colors.brandColorContrastText}
          onClick={onSubmitHandler}
          disabled={isSubmitDisabled}
          padding="8px 8px"
        >
          <AddRoundIcon />
        </IconButton>
      </Display>

      <Display condition={!isContentVisible}>
        <IconButton
          disabled={!isAuth}
          onClick={onIconClickHandler}
          color={theme.colors.textOnSecondary}
        >
          <AddRoundIcon />
        </IconButton>
      </Display>
    </StyledBox>
  );
};
