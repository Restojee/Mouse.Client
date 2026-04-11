import { useTag } from "@/modules/tag/hooks/useTag";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Form } from "@/ui/Form/Form";
import FormElement from "@/ui/Form/FormElement";
import { IconButton } from "@/ui/Button/IconButton";
import { Popup } from "@/ui/Popup";
import { AnchorAlign, PopupPosition } from "@/ui/Popup/usePopupPosition";
import { StyledBox } from "@/ui/Box";
import { Typography } from "@/ui/Typography/styles/Typography";
import React from "react";
import { AddRoundIcon } from "@/svg/AddRoundIcon";

type CreateTagPopupProps = {
  isVisible: boolean;
  onClose: () => void;
  anchor: React.ReactElement;
};
export const CreateTagPopup = (props: Partial<CreateTagPopupProps>) => {
  const [name, setName] = React.useState("");
  const { onTagCreate } = useTag();
  const { theme } = useAppTheme();
  const { isVisible = false, anchor } = props;
  const [isLoading, setIsLoading] = React.useState(false);

  const isValid = React.useMemo(() => {
    return Boolean(name.trim().length);
  }, [name]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onFormSubmit = async () => {
    if (isValid) {
      setIsLoading(true);
      const res = await onTagCreate(name);
      if (res?.payload) {
        setName("");
        props.onClose?.();
      }
      setIsLoading(false);
    }
  };

  return (
    <Popup
      isVisible={isVisible}
      onClose={props.onClose}
      position={PopupPosition.TOP}
      anchorAlign={AnchorAlign.END}
      offset={15}
      minWidth={220}
      borderRadius="15px"
      anchor={anchor ?? <span />}
    >
      <StyledBox
        direction="column"
        gap="8px"
        padding="0"
        color={theme.colors.textOnSecondary}
      >
        <Typography style={{ fontWeight: 600 }}>Добавить тег</Typography>
        <Form
          onSubmit={onFormSubmit}
          gap="5px"
          align="center"
          direction={"row"}
        >
          <FormElement
            autoFocus
            value={name}
            onChange={onChangeHandler}
            placeholder="Введите название..."
          />
          <IconButton
            disabled={!isValid || isLoading}
            type="submit"
          >
            <AddRoundIcon />
          </IconButton>
        </Form>
      </StyledBox>
    </Popup>
  );
};
