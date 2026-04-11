import { MapParametersForm } from "../containers/create-form/MapParametersForm";
import { Input } from "@/ui/Input";
import { StyledBox } from "@/ui/Box";
import { DotsHorizontalIcon } from "@/svg/DotsHorizontalIcon";
import { IconButton } from "@/ui/Button/IconButton";
import { Popup } from "@/ui/Popup";
import { AnchorAlign, PopupPosition } from "@/ui/Popup/usePopupPosition";
import React from "react";
import { useAppTheme } from "@/hooks/useAppTheme";

type Props = {
  name: string;
  setName: (name: string) => void;
  isVisible: boolean;
  onImagePopupToggle: () => void;
  onMapCreate: () => void;
};
export const MapCreatePopup = (props: Partial<Props>) => {
  const { name, setName, onMapCreate, isVisible = true, onImagePopupToggle } = props;
  const { theme } = useAppTheme();

  const onNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.currentTarget.value;
    setName?.(text);
  };
  const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && onMapCreate) {
      onMapCreate();
    }
  };

  const formRow = (
    <StyledBox
      align="center"
      gap={4}
      position={"relative"}
    >
      <StyledBox
        style={{
          left: 8,
          bottom: 6,
          backgroundColor: theme.colors.input.border,
          border: `1px solid ${theme.colors.input.border}`,
          borderRadius: 10,
          padding: 2,
        }}
        position={"absolute"}
        zIndex={2}
      >
        <IconButton onClick={onImagePopupToggle}>
          <DotsHorizontalIcon size="17px" />
        </IconButton>
      </StyledBox>

      <Input
        style={{ paddingLeft: 40 }}
        value={name}
        onKeyDown={onKeyDownHandler}
        onChange={onNameChangeHandler}
        placeholder="Номер карты @123456"
        width="auto"
        compact
      />
    </StyledBox>
  );

  return (
    <Popup
      isVisible={isVisible}
      onClose={onImagePopupToggle}
      position={PopupPosition.TOP}
      anchorAlign={AnchorAlign.START}
      offset={45}
      minWidth={278}
      noPadding
      anchor={formRow}
    >
      <MapParametersForm />
    </Popup>
  );
};
