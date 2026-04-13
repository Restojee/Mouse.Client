import React from "react";
import { MapParametersForm } from "../containers/create-form/MapParametersForm";
import { Input } from "@/ui/Input";
import { DotsHorizontalIcon } from "@/svg/DotsHorizontalIcon";
import { IconButton } from "@/ui/Button/IconButton";
import { Popup } from "@/ui/Popup";
import { AnchorAlign, PopupPosition } from "@/ui/Popup/usePopupPosition";
import styles from "./MapCreatePopup.module.scss";
import { useMapCreatePopup } from "./useMapCreatePopup";

type MapCreatePopupPropsType = {
  name: string;
  setName: (name: string) => void;
  isVisible: boolean;
  onImagePopupToggle: () => void;
  onMapCreate: () => void;
};

export const MapCreatePopup = (props: Partial<MapCreatePopupPropsType>) => {
  const { name, setName, onMapCreate, isVisible = true, onImagePopupToggle } = props;
  const { onNameChangeHandler, onKeyDownHandler } = useMapCreatePopup({ setName, onMapCreate });

  const formRow = (
    <div className={styles.formRow}>
      <Input
        inputPrepend={
          <IconButton onClick={onImagePopupToggle}>
            <DotsHorizontalIcon size="17px" />
          </IconButton>
        }
        className={styles.input}
        value={name}
        onKeyDown={onKeyDownHandler}
        onChange={onNameChangeHandler}
        placeholder="Номер карты @123456"
        width="100%"
        compact
      />
    </div>
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
