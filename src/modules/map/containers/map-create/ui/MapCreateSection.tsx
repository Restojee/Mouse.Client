import React from "react";
import { AddRoundIcon } from "@/svg/AddRoundIcon";
import { Display } from "@/ui/Display";
import { IconButton } from "@/ui/Button/IconButton";
import styles from "./MapCreateSection.module.scss";
import { MapCreatePopup } from "./MapCreatePopup";
import { useMapCreateSection } from "./useMapCreateSection";

type MapCreateSectionPropsType = {
  defaultExpanded?: boolean;
};

export const MapCreateSection = (props: MapCreateSectionPropsType) => {
  const {
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
  } = useMapCreateSection(props);

  return (
    <div className={styles.root}>
      <Display condition={isContentVisible}>
        <MapCreatePopup
          name={name}
          setName={setName}
          isVisible={isPopupOpen}
          onImagePopupToggle={onImagePopupToggle}
          onMapCreate={onSubmitHandler}
        />
      </Display>

      <Display condition={isContentVisible}>
        <IconButton
          className={styles.submitButton}
          color={submitIconColor}
          onClick={onSubmitHandler}
          disabled={isSubmitDisabled}
        >
          <AddRoundIcon />
        </IconButton>
      </Display>

      <Display condition={!isContentVisible}>
        <IconButton
          className={styles.toggleButton}
          disabled={!isAuth}
          onClick={onIconClickHandler}
          color={toggleIconColor}
        >
          <AddRoundIcon />
        </IconButton>
      </Display>
    </div>
  );
};
