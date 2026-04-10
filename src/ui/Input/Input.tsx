import { StyledBox } from "@/ui/Box";
import { Display } from "@/ui/Display";
import { StyledInput, StyledInputIcon, StyledInputWrapper } from "@/ui/Form/styled";
import React from "react";
import { StyledFieldError } from "./styled";

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
    <StyledBox
      width={props.width || "100%"}
      direction={"column"}
      margin={isError ? "0 0 5px 0" : 0}
      transition={"0.2s"}
      position={"relative"}
    >
      <Display condition={props.title}>
        <StyledBox
          opacity={0.5}
          fontSize={"0.8rem"}
          padding={"0 0 5px 15px"}
        >
          {props.title}
        </StyledBox>
      </Display>
      <StyledInputWrapper
        isDisabled={props.disabled}
        bgColor={bgColor}
        isError={isError}
        noBorder={noBorder}
      >
        {inputPrepend && <StyledInputIcon left>{inputPrepend}</StyledInputIcon>}
        <StyledInput
          {...inputProps}
          compact={compact}
          noBorder={noBorder}
          ref={null}
          style={(inputPrepend && { paddingLeft: 40 }) || (inputAppend && { paddingRight: 40 }) || {}}
        />
        {props.inputAppend && <StyledInputIcon right>{inputAppend}</StyledInputIcon>}
      </StyledInputWrapper>
      <StyledFieldError isError={isError}>{error}</StyledFieldError>
    </StyledBox>
  );
};
