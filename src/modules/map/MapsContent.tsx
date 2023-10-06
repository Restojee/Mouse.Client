import { routes } from '@/common/routes';
import { StyledMapsGrid } from "@/modules/map/styles/StyledMapsGrid";
import { MapCard } from "@/modules/map/MapCard";
import { Map } from "@/api/codegen/genMouseMapsApi";
import {CommonUtils} from "@/common/utils";
import { useRouter } from 'next/router';

type Props = {
    maps?: Map[];
}
export const MapsContent = (props: Props) => {
    const { maps } = props;
    const router = useRouter()

    const onMapClickHandler = async (id: Map['id']) => {
        try {
            const stringId = String(id);
            await router.push(`${routes.MAPS}/${stringId}`)
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <StyledMapsGrid>
            { maps?.map(map => (
                <MapCard
                    key={ map.id }
                    id={map.id}
                    addedCount={ 1 }
                    commentsCount={ 1 }
                    onClick={ onMapClickHandler }
                    label={ map.name }
                    image={ CommonUtils.getMapImageLink(map.image)  }
                />
            )) }
        </StyledMapsGrid>
    )
}