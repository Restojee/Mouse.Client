import formStyles from "@/ui/Form/Form.module.scss";
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

    <div className={formStyles.formElementContainer}>
      {title && <div className={formStyles.formElementHeader}>{title}</div>}

      <div
        className={[formStyles.inputWrapper, noBorder && formStyles.inputWrapperNoBorder].filter(Boolean).join(" ")}
        style={bgColor ? { backgroundColor: bgColor } : undefined}
      >
        {inputPrepend && (
          <div className={[formStyles.inputIcon, formStyles.inputIconLeft].filter(Boolean).join(" ")}>
            {inputPrepend}
          </div>
        )}
        <input
          {...inputProps}
          className={[formStyles.input, noBorder && formStyles.inputNoBorder].filter(Boolean).join(" ")}
        />
        {props.inputAppend && (
          <div className={[formStyles.inputIcon, formStyles.inputIconRight].filter(Boolean).join(" ")}>
            {inputAppend}
          </div>
        )}
      </div>
    </div>
  );
}
