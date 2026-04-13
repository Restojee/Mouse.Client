import React from "react";
import { Form } from "@/ui/Form/Form";
import FormElement from "@/ui/Form/FormElement";
import { IconButton } from "@/ui/Button/IconButton";
import { Popup } from "@/ui/Popup";
import { AnchorAlign, PopupPosition } from "@/ui/Popup/usePopupPosition";
import { Typography } from "@/ui/Typography/styles/Typography";
import { AddRoundIcon } from "@/svg/AddRoundIcon";
import styles from "./CreateTagPopup.module.scss";
import { useCreateTagPopup } from "./useCreateTagPopup";

type CreateTagPopupPropsType = {
  isVisible: boolean;
  onClose: () => void;
  anchor: React.ReactElement;
};

const EMPTY_ANCHOR = <span />;

export const CreateTagPopup = (props: Partial<CreateTagPopupPropsType>) => {
  const { isVisible = false, anchor, onClose } = props;
  const { name, isSubmitDisabled, submitIconColor, onChangeHandler, onFormSubmit } = useCreateTagPopup({ onClose });

  return (
    <Popup
      isVisible={isVisible}
      onClose={onClose}
      position={PopupPosition.TOP}
      anchorAlign={AnchorAlign.END}
      offset={15}
      minWidth={220}
      borderRadius="15px"
      anchor={anchor ?? EMPTY_ANCHOR}
    >
      <div className={styles.body}>
        <Typography className={styles.title}>Добавить тег</Typography>
        <Form onSubmit={onFormSubmit} gap="5px" align="center" direction={"row"}>
          <FormElement
            autoFocus
            value={name}
            onChange={onChangeHandler}
            placeholder="Введите название..."
          />
          <IconButton
            className={styles.submitButton}
            color={submitIconColor}
            disabled={isSubmitDisabled}
            type="submit"
          >
            <AddRoundIcon />
          </IconButton>
        </Form>
      </div>
    </Popup>
  );
};
