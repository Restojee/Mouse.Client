import React from 'react';
import { useAppTheme } from '@/hooks/useAppTheme';
import { StyledBox } from '@/ui/Box';
import { SendIcon } from '@/svg/SendIcon';
import { Property } from 'csstype';
import { StyledMessageSendFormIcon, StyledMessageSendFormTextarea } from './styled';

type PropsType = {
    value: string;
    bgColor: Property.BackgroundColor;
    onSendClick: (e: React.MouseEvent<HTMLDivElement>) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLTextAreaElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}
export const MessageSendFormContainer = (props: Partial<PropsType>) => {
    const {
        value,
        bgColor,
        onSendClick,
        onChange,
        onKeyDown,
    } = props;

    const theme = useAppTheme();

    return (
        <StyledBox
            align={'center'}
            margin={'auto 0 0 0'}
            width={'100%'}
            padding={'10px 0 10px 10px'}
        >
            <StyledMessageSendFormTextarea
                onChange={onChange}
                onKeyDown={onKeyDown}
                bgColor={bgColor}
                value={value}
                placeholder="Введите сообщение..."
            />
            <StyledMessageSendFormIcon onClick={onSendClick}>
                <SendIcon size="30px" color={theme.colors.textOnSecondary}/>
            </StyledMessageSendFormIcon>
        </StyledBox>
    );
};
