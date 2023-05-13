import { StyledMapsGrid } from "@/modules/map/styles/StyledMapsGrid";
import { MapCard } from "@/modules/map/MapCard";
import { Map } from "@/api/codegen/genMouseMapsApi";
import {CommonUtils} from "@/common/utils";

type Props = {
    maps?: Map[];
}
export const MapsContent = (props: Props) => {
    const { maps } = props;
    return (
        <StyledMapsGrid>
            { maps?.map(map => (
                <MapCard
                    key={ map.id }
                    addedCount={ 1 }
                    commentsCount={ 1 }
                    label={ map.name }
                    image={ CommonUtils.getMapImageLink(map.image)  }
                />
            )) }
        </StyledMapsGrid>
    )
}