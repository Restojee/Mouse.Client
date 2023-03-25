import FormElement from "@/ui/Form/FormElement";
import { AddImageIcon } from "@/svg/AddImageIcon";
import { MapParametersPopup } from "@/modules/map/MapParametersPopup";
import { StyledPanelSectionWrapper } from "@/layout/page/styles/StyledPagePanel";

type Props = {
    isVisible: boolean;
    onClickCreate: () => void;
}
export const MapCreatePopup = (props: Partial<Props>) => {
    const { isVisible = true, onClickCreate } = props;
    return (
        <StyledPanelSectionWrapper>
            <FormElement
                inputAppend={
                    <AddImageIcon
                        onClick={ onClickCreate }
                        color="gray"
                    />
                }
                placeholder="Номер карты @123456"
            />
            <MapParametersPopup
                isVisible={ isVisible }
            />
        </StyledPanelSectionWrapper>
    )
}