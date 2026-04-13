import { Box } from "@/ui/Box";
import { Display } from "@/ui/Display";
import formStyles from "@/ui/Form/Form.module.scss";
import React from "react";
import inputStyles from "./Input.module.scss";

export type DefaultInputType = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

type InputPropsType = DefaultInputType & {
  inputPrepend?: React.ReactNode;
  inputAppend?: React.ReactNode;
  error?: string;
  bgColor?: React.CSSProperties["backgroundColor"];
  noBorder?: boolean;
  compact?: boolean;
};
export const Input = (props: InputPropsType) => {
  const { inputAppend, inputPrepend, bgColor, error, noBorder, compact, ...inputProps } = props;

  const isError = Boolean(error);

  return (
    <Box
      width={props.width || "100%"}
      direction={"column"}
      margin={isError ? "0 0 5px 0" : 0}
      transition={"0.2s"}
      position={"relative"}
    >
      <Display condition={props.title}>
        <Box
          opacity={0.5}
          fontSize={"0.8rem"}
          padding={"0 0 5px 15px"}
        >
          {props.title}
        </Box>
      </Display>
      <div
        className={[
          formStyles.inputWrapper,
          props.disabled && formStyles.inputWrapperDisabled,
          isError && formStyles.inputWrapperError,
          noBorder && formStyles.inputWrapperNoBorder,
        ]
          .filter(Boolean)
          .join(" ")}
        style={bgColor ? { backgroundColor: bgColor } : undefined}
      >
        {inputPrepend ? (
          <div className={[formStyles.inputIcon, formStyles.inputIconLeft].filter(Boolean).join(" ")}>
            {inputPrepend}
          </div>
        ) : null}
        <input
          {...inputProps}
          className={[
            formStyles.input,
            compact && formStyles.inputCompact,
            noBorder && formStyles.inputNoBorder,
            compact && noBorder && formStyles.inputCompactNoBorder,
          ]
            .filter(Boolean)
            .join(" ")}
          ref={null}
          style={(inputPrepend && { paddingLeft: 40 }) || (inputAppend && { paddingRight: 40 }) || inputProps.style}
        />
        {props.inputAppend ? (
          <div className={[formStyles.inputIcon, formStyles.inputIconRight].filter(Boolean).join(" ")}>
            {inputAppend}
          </div>
        ) : null}
      </div>
      <div className={[inputStyles.fieldError, isError && inputStyles.fieldErrorVisible].filter(Boolean).join(" ")}>
        {error}
      </div>
    </Box>
  );
};
