import { MapParametersForm } from "@/modules/map/containers/map-create/containers/create-form/MapParametersForm";
import { PointBlock } from "@/ui/PointBlock/PointBlock";

type Props = {
    isVisible: boolean;
}
export const MapParametersPopup = (props: Partial<Props>) => {
    const { isVisible = true } = props;
    if (isVisible) {
        return (
            <PointBlock
                header="Добавить дополнительные параметры"
                width="230px"
                bottom="60px"
            >
                <MapParametersForm />
            </PointBlock>
        )
    }
    return null
}