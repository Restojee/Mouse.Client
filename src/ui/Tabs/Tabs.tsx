import { StyledBox } from '@/ui/Box';

type TabsPropsType = {
    children: JSX.Element[];
}
export const Tabs = ({ children }: TabsPropsType) => {
    return (
        <StyledBox
            gap={10}
        >
            {children}
        </StyledBox>
    );
};

