import { StyledBox } from '@/ui/Box';
import { Display } from '@/ui/Display';
import { Paper } from '@/ui/Paper';
import React from 'react';
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
        children,
    } = props;

    const theme = useAppTheme();

    return (
        <React.Fragment>
            <StyledMegaShadow/>
            <StyledModalWrapper onClick={onClose}>
                <Paper width={400} height={'auto'} gap={20}>
                    <Display condition={!children}>
                        <>
                            <Typography fontSize="18px" color={theme.colors.textOnSecondary}>
                                Подтверждение действия
                            </Typography>
                            <Typography color={theme.colors.textOnSecondary}>
                                {text || 'Вы действительно уверены?'}
                            </Typography>
                        </>
                    </Display>
                    <Display condition={children}>
                        <StyledBox direction={'column'}>
                            {children}
                        </StyledBox>
                    </Display>
                    <StyledCardActions>
                        <Button
                            label="Отмена"
                            onClick={onClose}
                        />
                        <Button
                            size={'lg'}
                            onClick={onAccess}
                            bgColor={theme.colors.status.success}
                            label="Подтвердить"
                        />
                    </StyledCardActions>
                </Paper>
            </StyledModalWrapper>
        </React.Fragment>
    );
};

export default AsyncModalContent;
