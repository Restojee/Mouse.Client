import { useAppTheme } from '@/hooks/useAppTheme';
import { Button } from '@/ui/Button';

type TabPropsType = {
    label: string;
    isActive?: boolean;
    onClick?: () => void;
}
export const Tab = ({ label, onClick, isActive }: TabPropsType) => {
    const theme = useAppTheme();

    return (
        <Button
            width={'100%'}
            onClick={onClick}
            borderRadius={'8px'}
            label={label}
            size={"sm"}
            bgColor={isActive ? theme.colors.brandColor : theme.colors.secondaryDark}
            color={isActive ? theme.colors.brandColorContrastText : 'initial'}
        />
    );
};

