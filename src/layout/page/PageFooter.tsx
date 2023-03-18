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

type Props = {
    children: ReactNode;
}
export const PageFooter = (props: Partial<Props>) => {
    const [ isMapCreatePopupOpen , setIsMapCreatePopupOpen ] = useState(false);

    const theme = useTheme() as typeof DefaultTheme

    return (
        <StyledPagePanel top>
            <StyledBox width="100%" justify="space-between">
                <PagePanelItem
                    prepend={
                        <AddRoundIcon
                            onClick={ () => setIsMapCreatePopupOpen(prev => !prev) }
                            color={ theme.colors.primary }
                        />
                    }
                    content={
                        <StyledPanelSectionWrapper>
                            <FormElement
                                inputAppend={
                                    <AddImageIcon
                                        onClick={ () => setIsMapCreatePopupOpen(prev => !prev) }
                                        color="gray"
                                    />
                                }
                                placeholder="Номер карты @123456"
                            />
                            { isMapCreatePopupOpen && <MapParametersPopup /> }
                        </StyledPanelSectionWrapper>
                    }
                />
                <StyledBox>
                    <PagePanelSection />
                    <PagePanelSection />
                </StyledBox>
            </StyledBox>
        </StyledPagePanel>
    )
}