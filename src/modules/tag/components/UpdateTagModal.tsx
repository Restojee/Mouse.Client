import { Tag } from "@/api/codegen/genMouseMapsApi";
import { useAppNotifications } from "@/hooks/useAppNotifications";
import { useAppSelector } from "@/hooks/useAppSelector";
import { selectTagModalType } from "@/modules/tag";
import { useTag } from "@/modules/tag/hooks/useTag";
import styles from "./Tag.module.scss";
import { Input } from "@/ui/Input";
import { AsyncSheet as Modal } from "@/ui/Sheet/view";
import textareaStyles from "@/ui/Textarea/Textarea.module.scss";
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

  const onTagNameChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setTagName(e.currentTarget.value);
  }, []);

  const onTagDescriptionChange = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTagDescription(e.currentTarget.value);
  }, []);

  return (
    <Modal
      isOpen={modalType === "tag-update"}
      onClose={onCloseModal}
      onAccess={onSuccess}
      title={"Редактирование тега"}
    >
      <div className={styles.updateTagModal}>
        <Input
          placeholder={"Название тега"}
          value={tagName}
          onChange={onTagNameChange}
        />
        <textarea
          className={textareaStyles.textarea}
          style={{ backgroundColor: "var(--color-input-default)", height: "100px", minHeight: "100px" }}
          placeholder={"Описание тега"}
          value={tagDescription}
          onChange={onTagDescriptionChange}
        />
      </div>
    </Modal>
  );
};
