import React from 'react';
import { StyledBox } from '@/ui/Box';
import { Display } from '@/ui/Display';
import { Paper } from '@/ui/Paper';
import { useAppTheme } from '@/hooks/useAppTheme';
import { Button } from '@/ui/Button';
import { StyledCardActions } from '@/ui/Form/styled';
import { ModalPropsType } from '@/ui/Modal/Modal';
import { StyledMegaShadow, StyledModalWrapper } from '@/ui/Modal/styled';
import { Typography } from '@/ui/Typography';

const AsyncModalContent = (props: ModalPropsType) => {
    const {
        onClose,
        onAccess,
        text,
        title,
        children,
        width,
        withoutButtons,
    } = props;

    const theme = useAppTheme();

    return (
        <React.Fragment>
            <StyledMegaShadow/>
            <StyledModalWrapper onClick={onClose}>
                <Paper
                    onClick={(e) => e.stopPropagation()}
                    height={'auto'}
                    gap={20}
                    width={width || 400}
                >
                    <Typography fontSize="18px" color={theme.colors.textOnSecondary}>
                        {title || 'Подтверждение действия'}
                    </Typography>
                    <Display condition={!children}>
                        <Typography color={theme.colors.textOnSecondary}>
                            {text || 'Вы действительно уверены?'}
                        </Typography>
                    </Display>
                    <Display condition={children}>
                        <StyledBox direction={'column'} width={'100%'}>
                            {children}
                        </StyledBox>
                    </Display>
                    <Display condition={!withoutButtons}>
                        <StyledCardActions>
                            <Button
                                label="Отмена"
                                onClick={onClose}
                            />
                            <Button
                                type={'submit'}
                                size={'lg'}
                                onClick={onAccess}
                                bgColor={theme.colors.status.success}
                                label="Подтвердить"
                            />
                        </StyledCardActions>
                    </Display>
                </Paper>
            </StyledModalWrapper>
        </React.Fragment>
    );
};

export default AsyncModalContent;
