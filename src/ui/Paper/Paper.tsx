import { useAppTheme } from '@/hooks/useAppTheme';
import React from 'react';
import { StyledBox, StyledBoxProps } from '@/ui/Box';

export const Paper = ({ children, ...props }: Partial<StyledBoxProps>) => {
    const theme = useAppTheme();

    return (
        <StyledBox
            direction={'column'}
            textAlign={'center'}
            align={'center'}
            boxShadow={'0 0 100px 1px rgba(0, 0, 0, 1)'}
            width={'100%'}
            borderRadius={theme.blockSettings.siteBorder}
            height={'100%'}
            padding={'30px'}
            maxHeight={'100%'}
            bgColor={theme.colors.default.paper}
            zIndex={theme.order.modal}
            {...props}
        >
            {children}
        </StyledBox>
    );
};

