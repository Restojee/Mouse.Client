import React from 'react';
import { StyledInput, StyledInputIcon, StyledInputWrapper } from '@/ui/Form/styled';

export type DefaultInputType = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputPropsType = DefaultInputType & {
    inputPrepend?: React.ReactNode,
    inputAppend?: React.ReactNode,
    bgColor?: React.CSSProperties['backgroundColor']
}
export const Input = (props: InputPropsType) => {
    const {
        inputAppend,
        inputPrepend,
        ref,
        bgColor,
        ...inputProps
    } = props

    return (
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
    );
};

