import { Tag } from "@/api/codegen/genMouseMapsApi";
import { useAppNotifications } from "@/hooks/useAppNotifications";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectTagModalType } from "@/modules/tag";
import { StylesUpdateTagModal } from "@/modules/tag/components/styled";
import { useTag } from "@/modules/tag/hooks/useTag";
import { Input } from "@/ui/Input";
import { Modal } from "@/ui/Modal/Modal";
import { StyledTextarea } from "@/ui/Textarea/styled";
import React, { useCallback, useLayoutEffect, useState } from "react";

interface Props {
  tag?: Tag;
}

export const UpdateTagModal = (props: Props) => {
  const [tagName, setTagName] = useState(props.tag?.name);
  const [tagDescription, setTagDescription] = useState(props.tag?.description);
  const { onError } = useAppNotifications();

  const modalType = useAppSelector(selectTagModalType);
  const { onTagUpdate, onCloseModal } = useTag();

  const onSuccess = useCallback(async () => {
    if (tagDescription?.length && tagDescription.length > 1000) {
      onError("Превышено макс. количество символов");
      return;
    }

    if (tagName?.length && tagName.length > 200) {
      onError("Превышено макс. количество символов");
      return;
    }

    await onTagUpdate({ id: props.tag?.id, description: tagDescription, name: tagName });
  }, [onError, onTagUpdate, props.tag?.id, tagDescription, tagName]);

  useLayoutEffect(() => {
    setTagName(props.tag?.name || "");
    setTagDescription(props.tag?.description || "");

    return () => {
      setTagName("");
      setTagDescription("");
    };
  }, [props.tag?.description, props.tag?.name]);

  return (
    <Modal
      isOpen={modalType === "tag-update"}
      onClose={onCloseModal}
      onAccess={onSuccess}
      title={"Редактирование тега"}
    >
      <StylesUpdateTagModal>
        <Input
          placeholder={"Название тега"}
          value={tagName}
          onChange={(e) => setTagName(e.currentTarget.value)}
        />
        <StyledTextarea
          placeholder={"Описание тега"}
          value={tagDescription}
          onChange={(e) => setTagDescription(e.currentTarget.value)}
        />
      </StylesUpdateTagModal>
    </Modal>
  );
};
