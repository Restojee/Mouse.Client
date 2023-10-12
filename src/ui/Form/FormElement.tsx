import {
    StyledFormElementContainer,
    StyledFormElementHeader,
    StyledInput,
    StyledInputIcon,
    StyledInputWrapper,
} from '@/ui/Form/styled';
import { DefaultInputType } from '@/ui/Input/Input';
import { Property } from "csstype";
import { StyledTextarea } from "../Textarea/styled";
import React, { ChangeEvent } from "react";

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
    const {
        textarea,
        searchForm,
        bgColor,
        inputAppend,
        inputPrepend,
        isOpen,
        title,
        ref,
        ...inputProps
    } = props

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
            { title &&
                <StyledFormElementHeader>
                    { title }
                </StyledFormElementHeader>
            }
            { textarea &&
                <StyledTextarea />
            }
            { textarea || (
                <StyledInputWrapper bgColor={ bgColor }>
                    { inputPrepend && (
                        <StyledInputIcon left>
                            { inputPrepend }
                        </StyledInputIcon>
                    ) }
                    <StyledInput {...inputProps}/>
                    { props.inputAppend && (
                        <StyledInputIcon right>
                            { inputAppend }
                        </StyledInputIcon>
                    ) }
                </StyledInputWrapper>
            )}
        </StyledFormElementContainer>
    );
}
