import { StyledPageContent } from '@/layout/page/styles/StyledPageContent';
import { StyledBox } from '@/ui/Box';
import { ReactNode } from 'react';

type Props = {
    children: ReactNode;
}
export const PageContent = (props: Partial<Props>) => {
    return (
        <StyledBox
            overflow={'hidden'}
            position={'relative'}
            grow={1}
        >
            <StyledPageContent>
                {props.children}
            </StyledPageContent>
        </StyledBox>
    );
};