import { StyledMapsGrid } from "@/modules/map/styles/StyledMapsGrid";
import { MapCard } from "@/modules/map/MapCard";
import { Map } from "@/api/codegen/mouseMapsApi";
import { memo } from "react";

type Props = {
    maps?: Map[];
}
export const MapContent = (props: Props) => {
    const { maps } = props;
    return (
        <StyledMapsGrid>
            { maps?.map(el => (
                <MapCard
                    key={ el.id }
                    addedCount={ 1 }
                    commentsCount={ 1 }
                    label={ el.name }
                    image={ `http://tfm-maps.ru:9000/maps/${el.image}` }
                />
            )) }
        </StyledMapsGrid>
    )
}