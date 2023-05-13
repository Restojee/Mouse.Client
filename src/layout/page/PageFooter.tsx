import {
    ReactNode,
    useState
} from "react";
import { StyledBox } from "@/ui/Box/styles/StyledBox";
import { PagePanelSection } from "@/layout/page/PagePanelSection";
import {
    StyledPagePanel,
    StyledPanelSectionWrapper
} from "@/layout/page/styles/StyledPagePanel";
import { AddRoundIcon } from "@/svg/AddRoundIcon";
import { useTheme } from "styled-components";
import PagePanelItem from "@/layout/page/PagePanelItem";
import { AddImageIcon } from "@/svg/AddImageIcon";
import { DefaultTheme } from "@/layout/theme/constants";
import FormElement from "@/ui/Form/FormElement";
import { MapParametersPopup } from "@/modules/map/MapParametersPopup";
import {useAppTheme} from "@/hooks/useAppTheme";

type Props = {
    children: ReactNode;
}
export const PageFooter = (props: Partial<Props>) => {
    return (
        <StyledPagePanel top>
            { props.children }
        </StyledPagePanel>
    )
}