import React, { ChangeEvent, useCallback } from "react";
import clsx from "clsx";
import styles from "./PersonalDataConsent.module.scss";

type PersonalDataConsentPropsType = {
  name: string;
  checked?: boolean;
  disabled?: boolean;
  error?: string;
  onChange: (value: boolean) => void;
  onBlur: () => void;
  onPolicyOpen: () => void;
};

export const PersonalDataConsent = ({
  name,
  checked,
  disabled,
  error,
  onChange,
  onBlur,
  onPolicyOpen,
}: PersonalDataConsentPropsType) => {
  const handleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => onChange(event.target.checked),
    [onChange],
  );
  const checkboxClassName = clsx(styles.checkbox, checked && styles.checkboxChecked);
  const hasCheckMark = Boolean(checked);

  return (
    <label className={styles.root}>
      <input
        className={styles.nativeInput}
        type="checkbox"
        name={name}
        checked={checked}
        disabled={disabled}
        onChange={handleChange}
        onBlur={onBlur}
      />
      <span
        className={checkboxClassName}
        aria-hidden="true"
      >
        {hasCheckMark ? <span className={styles.checkMark} /> : null}
      </span>
      <span className={styles.content}>
        <span className={styles.labelText}>
          Я согласен на обработку персональных данных и принимаю{" "}
          <button
            type="button"
            className={styles.linkButton}
            onClick={onPolicyOpen}
            disabled={disabled}
          >
            политику конфиденциальности
          </button>
          .
        </span>
        {error ? <span className={styles.error}>{error}</span> : null}
      </span>
    </label>
  );
};
