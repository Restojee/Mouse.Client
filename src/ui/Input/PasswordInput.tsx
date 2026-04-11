import type { DefaultInputType } from "./Input";
import { Input } from "./Input";
import { EyeIcon } from "@/svg/EyeIcon";
import { EyeOffIcon } from "@/svg/EyeOffIcon";
import React, { useState } from "react";
import styles from "./Input.module.scss";

type PasswordInputProps = DefaultInputType & {
  error?: string;
  title?: string;
};

export const PasswordInput = (props: PasswordInputProps) => {
  const { error, title, ...rest } = props;
  const [visible, setVisible] = useState(false);

  const toggle = () => setVisible((v) => !v);

  return (
    <Input
      {...rest}
      type={visible ? "text" : "password"}
      error={error}
      title={title}
      inputAppend={
        <div
          className={styles.icon}
          onClick={toggle}
          title={visible ? "Скрыть" : "Показать"}
        >
          {visible ? <EyeOffIcon /> : <EyeIcon />}
        </div>
      }
    />
  );
};
