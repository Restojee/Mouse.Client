import { Display } from '@/ui/Display';
import React from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { StyledBox } from '@/ui/Box';
import { SendIcon } from '@/svg/SendIcon';
import { Property } from 'csstype';
import { StyledMessageSendFormIcon, StyledMessageSendFormTextarea, StyledMessageDisabled } from './styled';

type PropsType = {
    disabled: boolean;
    value: string;
    bgColor: Property.BackgroundColor;
    onSendClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
    onFocus: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export const MessageSendFormContainer = (props: Partial<PropsType>) => {
    const {
        value,
        bgColor,
        onSendClick,
        onChange,
        onFocus,
        onKeyDown,
        disabled,
    } = props;

    const theme = useAppTheme();

    return (
        <StyledBox
            align={'center'}
            margin={'auto 0 0 0'}
            width={'100%'}
            padding={disabled ? '10px'  : '10px 0 10px 10px'}
            position={'relative'}
        >
            <Display condition={disabled}>
                <StyledMessageDisabled>
                    Вы не авторизованы
                </StyledMessageDisabled>
            </Display>
            <StyledMessageSendFormTextarea
                onChange={onChange}
                onKeyDown={onKeyDown}
                onFocus={onFocus}
                bgColor={bgColor}
                value={value}
                placeholder={disabled ? "" : "Введите сообщение..."}
            />
            <Display condition={!disabled}>
                <StyledMessageSendFormIcon onClick={onSendClick}>
                    <SendIcon size="30px" color={theme.colors.textOnSecondary}/>
                </StyledMessageSendFormIcon>
            </Display>
        </StyledBox>
    );
};
