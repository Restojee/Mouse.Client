import { MapParametersForm } from "@/modules/map/MapParametersForm";
import { PointBlock } from "@/ui/PointBlock/PointBlock";

export const MapParametersPopup = () => {
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