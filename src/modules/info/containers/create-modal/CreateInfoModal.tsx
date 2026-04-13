import React from "react";
import formStyles from "@/ui/Form/Form.module.scss";
import textareaStyles from "@/ui/Textarea/Textarea.module.scss";
import { Button } from "@/ui/Button";
import { Form } from "@/ui/Form/Form";
import styles from "./CreateInfoModal.module.scss";
import { useCreateInfoModal } from "./useCreateInfoModal";

type CreateInfoModalPropsType = {
  onClose: () => void;
};

export const CreateInfoModal = ({ onClose }: CreateInfoModalPropsType) => {
  const { register, onFormSubmit, isLoading, submitLabel, cancelColor, cancelBgColor, submitColor } =
    useCreateInfoModal({ onClose });

  return (
    <Form onSubmit={onFormSubmit}>
      <div className={styles.body}>
        <div className={formStyles.inputWrapper}>
          <input
            {...register("title")}
            className={formStyles.input}
            placeholder="Заголовок"
          />
        </div>
        <textarea
          className={`${textareaStyles.textarea} ${styles.textarea}`}
          placeholder="Описание"
          {...register("text")}
        />
        <div className={formStyles.cardActions}>
          <Button
            label="Отмена"
            color={cancelColor}
            bgColor={cancelBgColor}
            onClick={onClose}
            type="button"
          />
          <Button
            color={submitColor}
            type="submit"
            label={submitLabel}
            disabled={isLoading}
          />
        </div>
      </div>
    </Form>
  );
};
