import React, { useState } from 'react';
import { Button } from "@/ui/Button/Button";
import { useTheme } from "styled-components";
import { DefaultTheme } from "@/layout/theme/constants";
import { DoneRoundIcon } from "@/svg/DoneRoundIcon";
import { useCreateTagMutation } from "@/api/tagsApi";
import { Form } from "@/ui/Form/Form";
import FormElement from "@/ui/Form/FormElement";

export const CreateTagForm = () => {
    const theme = useTheme() as typeof DefaultTheme

    const [ name, setName ] = useState("");

    const [ createTag ] = useCreateTagMutation();

    return (
        <Form onSubmit={ () => createTag({ createTagRequest: { name } }) } gap="15px">
            <FormElement
                value={ name }
                onChange={ event => setName(event.target.value) }
                placeholder="Введите название..."
            />
            <Button type="submit" width="70px" bgColor={ theme.colors.status.success } >
                <DoneRoundIcon />
            </Button>
        </Form>
    );
}

export default CreateTagForm;
