import FormElement from "@/ui/Form/FormElement";
import { AddImageIcon } from "@/svg/AddImageIcon";
import { MapParametersPopup } from "./MapParametersPopup";
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
                placeholder="Номер карты @123456"
                inputAppend={
                    <AddImageIcon
                        onClick={ onClickCreate }
                        color="gray"
                    />
                }
            />
            <MapParametersPopup isVisible={ isVisible }/>
        </StyledPanelSectionWrapper>
    )
}