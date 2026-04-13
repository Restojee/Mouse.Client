import React, { CSSProperties, FormEvent, ReactNode, useCallback, useMemo } from "react";
import clsx from "clsx";
import styles from "./FormContainer.module.scss";

type FormPropsType = {
  children: ReactNode;
  onSubmit: () => void;
  className?: string;
  gap?: string | number;
  direction?: CSSProperties["flexDirection"];
  align?: CSSProperties["alignItems"];
};

const FORM_STYLE: CSSProperties = { display: "contents" };

export const Form = (props: FormPropsType) => {
  const { children, onSubmit, className, gap, direction, align } = props;

  const onSubmitHandler = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      onSubmit?.();
    },
    [onSubmit],
  );

  const rootStyle = useMemo<CSSProperties>(
    () => ({
      gap,
      flexDirection: direction,
      alignItems: align,
    }),
    [gap, direction, align],
  );

  return (
    <div className={clsx(styles.root, className)} style={rootStyle}>
      <form onSubmit={onSubmitHandler} style={FORM_STYLE}>
        {children}
      </form>
    </div>
  );
};
