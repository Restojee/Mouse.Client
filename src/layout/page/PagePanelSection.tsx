import {
    FC,
    ReactElement,
    useState
} from "react";
import { StyledBox } from "@/ui/Box";
import { StyledPagePanelButton } from "@/layout/page/styles/StyledPagePanelButton";


export type Props = {
    isOpen: boolean;
    icon: ReactElement;
    activeIcon: ReactElement;
    content: ReactElement;
}
export const PagePanelSection: FC<Partial<Props>> = (props) => {
    const { content, icon, activeIcon } = props;
    const [ isOpen, setIsOpen ] = useState(false);
    return (
        <StyledBox>
            <StyledPagePanelButton
                onClick={ () => setIsOpen(false) }
            >
                { icon }
                { isOpen && activeIcon }
            </StyledPagePanelButton>
            { isOpen && content }
        </StyledBox>
    )
}