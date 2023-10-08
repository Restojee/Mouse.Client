import { AddRoundIcon } from "@/svg/AddRoundIcon";
import { MapCreatePopup } from "@/modules/map/containers/map-create/ui/MapCreatePopup";
import { useState } from "react";
import { useAppTheme } from "@/hooks/useAppTheme";
import PagePanelItem from "@/layout/page/PagePanelItem";

export const MapCreateSection = () => {
    const [ isMapCreatePopupOpen , setIsMapCreatePopupOpen ] = useState(false);

    const theme = useAppTheme()

    return (
        <PagePanelItem
            prepend={
                <AddRoundIcon
                    onClick={ () => setIsMapCreatePopupOpen(prev => !prev) }
                    color={ theme.colors.primary }
                />
            }
            content={
                <MapCreatePopup
                    isVisible={ isMapCreatePopupOpen }
                    onClickCreate={ () => setIsMapCreatePopupOpen(true) }
                />
            }
        />
    )
}