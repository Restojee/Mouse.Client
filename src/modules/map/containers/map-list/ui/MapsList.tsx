import { routes } from '@/common/routes';
import { useAppSelector } from '@/hooks/useAppSelector';
import { selectMaps } from '@/modules/map/containers/map-list/slice';
import { StyledMapsGrid } from "@/modules/map/styles/StyledMapsGrid";
import { MapCard } from "@/modules/map/containers/map-list/ui/map-card/MapCard";
import { Map } from "@/api/codegen/genMouseMapsApi";
import {CommonUtils} from "@/common/utils";
import { StyledBox } from '@/ui/Box';
import { useRouter } from 'next/router';

export const MapsList = () => {
    const router = useRouter()
    const maps = useAppSelector(selectMaps)

    const onMapClickHandler = async (id: Map['id']) => {
        try {
            await router.push(`${routes.MAPS}/${id}`)
        } catch (err) {
            console.log(err)
        }
    }

    if (!maps.length) {
        return (
            <StyledBox
                align={'center'}
                justify={'center'}
                height={'100%'}
                margin={'auto'}
                opacity={0.5}
            >
                Карты не найдены
            </StyledBox>
        )
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