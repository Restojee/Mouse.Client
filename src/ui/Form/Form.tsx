import styled from "styled-components";
import {StyledBox, StyledBoxProps} from "@/ui/Box/styles/StyledBox";
import {
    FormEvent,
    ReactNode
} from "react";

const StyledForm = styled(StyledBox).attrs({ as: "form" })``;

type FormProps = {
    children: ReactNode;
    onSubmit: () => void;
}
export const Form = (props: Partial<FormProps & StyledBoxProps>) => {

    const onSubmitHandler = (event: FormEvent<HTMLDivElement>) => {
        event.preventDefault();
        props.onSubmit && props.onSubmit()
    }

    return (
        <StyledForm { ...props } onSubmit={ onSubmitHandler } />
    )
}