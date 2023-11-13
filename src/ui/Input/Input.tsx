import { StyledBox } from '@/ui/Box';
import React from 'react';
import { StyledFieldError } from './styled';
import { StyledInput, StyledInputIcon, StyledInputWrapper } from '@/ui/Form/styled';

export type DefaultInputType = React.DetailedHTMLProps<React.InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>

type InputPropsType = DefaultInputType & {
    inputPrepend?: React.ReactNode,
    inputAppend?: React.ReactNode,
    error?: string;
    bgColor?: React.CSSProperties['backgroundColor']
}
export const Input = (props: InputPropsType) => {
    const {
        inputAppend,
        inputPrepend,
        ref,
        bgColor,
        error,
        ...inputProps
    } = props

    const isError = Boolean(error)

    return (
        <StyledBox
            width={'100%'}
            direction={'column'}
            margin={isError ? '0 0 5px 0' : 0}
            transition={'0.2s'}
            position={'relative'}
        >
            <StyledInputWrapper bgColor={ bgColor } isError={isError}>
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
            <StyledFieldError isError={isError}>
                {error}
            </StyledFieldError>
        </StyledBox>
    );
};

