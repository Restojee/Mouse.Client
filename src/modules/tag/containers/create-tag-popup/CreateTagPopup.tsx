import { useAppTheme } from '@/hooks/useAppTheme';
import { useTag } from '@/modules/tag/common/hooks/useTag';
import { DoneRoundIcon } from '@/svg/DoneRoundIcon';
import { Button } from '@/ui/Button';
import { Form } from '@/ui/Form/Form';
import FormElement from '@/ui/Form/FormElement';
import { PointBlock } from "@/ui/PointBlock/PointBlock";
import React from 'react';

type CreateTagPopupProps = {
    isVisible: boolean;
}
export const CreateTagPopup = (props: Partial<CreateTagPopupProps>) => {
    const theme = useAppTheme();
    const [name, setName] = React.useState('');
    const { onTagAdd } = useTag();
    const { isVisible = true } = props;

    const isValid = React.useMemo(() => {
        return Boolean(name.trim().length);
    }, [name]);

    const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.currentTarget.name);
        console.log(e.currentTarget.name)
    };

    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            onFormSubmit();
        }
    };

    const onFormSubmit = () => {
        if (isValid) {
            onTagAdd(name);
        }
    };

    if (isVisible) {
        return (
            <PointBlock
                header="Добавить тег"
                width="100%"
                left="0"
                bottom="35px"
            >
                <Form onSubmit={onFormSubmit} gap="15px">
                    <FormElement
                        value={name}
                        onKeyDown={onKeyDownHandler}
                        onChange={onChangeHandler}
                        placeholder="Введите название..."
                    />
                    <Button
                        disabled={!isValid}
                        type="submit"
                        width="70px"
                        bgColor={theme.colors.status.success}
                    >
                        <DoneRoundIcon/>
                    </Button>
                </Form>
            </PointBlock>
        )
    }

    return null;
}