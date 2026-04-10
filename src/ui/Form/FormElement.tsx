import {
  StyledFormElementContainer,
  StyledFormElementHeader,
  StyledInput,
  StyledInputIcon,
  StyledInputWrapper,
} from "@/ui/Form/styled";
import { DefaultInputType } from "@/ui/Input/Input";
import { Property } from "csstype";
import React, { ChangeEvent } from "react";

type PropsType = DefaultInputType & {
  readOnly: boolean;
  onClick: () => void;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  title: string;
  isOpen: boolean;
  bgColor: Property.BackgroundColor;
  inputPrepend: React.ReactNode;
  inputAppend: React.ReactNode;
  searchForm: boolean;
  noBorder: boolean;
};
export default function FormElement(props: Partial<PropsType>) {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { searchForm, bgColor, inputAppend, inputPrepend, isOpen, title, ref, noBorder, ...inputProps } = props;

  return (
    // Подсказка:
    // <Form>
    //     <FormRow>
    //         <FormColumn>
    //             element
    //         </FormColumn>
    //         <FormColumn>
    //             element
    //         </FormColumn>
    //     </FormRow>
    // </Form>

    <StyledFormElementContainer>
      {title && <StyledFormElementHeader>{title}</StyledFormElementHeader>}

      <StyledInputWrapper bgColor={bgColor} noBorder={noBorder}>
        {inputPrepend && <StyledInputIcon left>{inputPrepend}</StyledInputIcon>}
        <StyledInput {...inputProps} noBorder={noBorder} />
        {props.inputAppend && <StyledInputIcon right>{inputAppend}</StyledInputIcon>}
      </StyledInputWrapper>
    </StyledFormElementContainer>
  );
}
