import {
    StyledFormElementContainer,
    StyledFormElementHeader,
    StyledInput, StyledInputIcon,
    StyledInputWrapper
} from "@/ui/Form/styled";
import { Property } from "csstype";
import { StyledTextarea } from "../Textarea/styled";
import React, { ChangeEvent } from "react";

type DefaultInputType = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>
type PropsType = DefaultInputType & {
    readOnly: boolean,
    onClick: () => void,
    onChange: (event: ChangeEvent<HTMLInputElement>) => void,
    title: string
    isOpen: boolean,
    bgColor: Property.BackgroundColor,
    inputPrepend: React.ReactNode,
    inputAppend: React.ReactNode,
    searchForm: boolean,
    textarea: boolean,
}
export default function FormElement(props: Partial<PropsType>) {
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
            { props.title &&
                <StyledFormElementHeader>
                    { props.title }
                </StyledFormElementHeader>
            }
            { props.textarea &&
                <StyledTextarea />
            }
            { props.textarea || (
                <StyledInputWrapper bgColor={ props.bgColor }>
                    { props.inputPrepend && (
                        <StyledInputIcon left>
                            { props.inputPrepend }
                        </StyledInputIcon>
                    ) }
                    <StyledInput
                        readOnly={ props.readOnly }
                        value={ props.value }
                        onClick={ props.onClick }
                        onChange={ props.onChange }
                        placeholder={ props.placeholder }
                        type={ props.type }
                        name={ props.name }
                    />
                    { props.inputAppend && (
                        <StyledInputIcon right>
                            { props.inputAppend }
                        </StyledInputIcon>
                    ) }
                </StyledInputWrapper>
            )}
        </StyledFormElementContainer>
    );
}
