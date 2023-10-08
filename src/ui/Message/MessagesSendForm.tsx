import { StyledBox } from '@/ui/Box';
import React from 'react';
import { useTheme } from 'styled-components';
import { DefaultTheme } from '@/layout/theme/constants';
import { SendIcon } from '@/svg/SendIcon';
import { Property } from 'csstype';
import { StyledMessageSendFormIcon, StyledMessageSendFormTextarea } from '@/ui/Message/styled';

type PropsType = {
    bgColor: Property.BackgroundColor;
    onSendMessage: () => void
}
export const MessageSendFormContainer = (props: Partial<PropsType>) => {

    const theme = useTheme() as typeof DefaultTheme;

    return (
        <StyledBox
            align={'center'}
            margin={'auto 0 0 0'}
            width={'100%'}
            padding={'10px 0 10px 10px'}
        >
            <StyledMessageSendFormTextarea
                bgColor={props.bgColor}
                placeholder="Введите сообщение..."
            />
            <StyledMessageSendFormIcon onClick={props.onSendMessage}>
                <SendIcon size="30px" color={theme.colors.textOnSecondary}/>
            </StyledMessageSendFormIcon>
        </StyledBox>
    );
};
