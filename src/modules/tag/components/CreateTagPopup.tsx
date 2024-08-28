import { useAppTheme } from "@/hooks/useAppTheme";
import { useTag } from "@/modules/tag/hooks/useTag";
import { DoneRoundIcon } from "@/svg/DoneRoundIcon";
import { Button } from "@/ui/Button";
import { Form } from "@/ui/Form/Form";
import FormElement from "@/ui/Form/FormElement";
import { ModalCloseIcon } from "@/ui/ModalCloseIcon";
import { PointBlock } from "@/ui/PointBlock/PointBlock";
import React from "react";

type CreateTagPopupProps = {
  isVisible: boolean;
  onClose: () => void;
};
export const CreateTagPopup = (props: Partial<CreateTagPopupProps>) => {
  const { theme } = useAppTheme();
  const [name, setName] = React.useState("");
  const { onTagCreate } = useTag();
  const { isVisible = true } = props;

  const isValid = React.useMemo(() => {
    return Boolean(name.trim().length);
  }, [name]);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const onFormSubmit = async () => {
    if (isValid) {
      const res = await onTagCreate(name);
      if (res?.payload) {
        setName("");
        props.onClose?.();
      }
    }
  };

  if (isVisible) {
    return (
      <PointBlock
        header="Добавить тег"
        width="auto"
        left="5px"
        right="5px"
        bottom="15px"
      >
        <ModalCloseIcon
          size={30}
          onClick={props.onClose}
        />
        <Form
          onSubmit={onFormSubmit}
          gap="15px"
        >
          <FormElement
            autoFocus
            value={name}
            onChange={onChangeHandler}
            placeholder="Введите название..."
          />
          <Button
            disabled={!isValid}
            type="submit"
            width="70px"
            bgColor={theme.colors.status.success}
          >
            <DoneRoundIcon />
          </Button>
        </Form>
      </PointBlock>
    );
  }

  return null;
};
