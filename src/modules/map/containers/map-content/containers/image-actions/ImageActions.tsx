import { useMap } from '@/modules/map/common';
import { useMapView } from '@/modules/map/containers/map-view-modal/hooks/useMapView';
import { useCompletedMap } from '../completed-images/hooks/useCompletedMap';
import { IconButton } from '@/ui/Button/IconButton';
import { StyledActionsContainer } from './styles';
import { EditFillIcon } from '@/svg/EditFillIcon';
import { DeleteIcon } from '@/svg/DeleteIcon';
import { Display } from '@/ui/Display';

export const ImageActions = () => {
    const { mapId } = useMapView();

    const {
        onMapImageModalOpen
    } = useMap()

    const {
        isMyMap,
        isInitialMap,
        deleteCompletedMap,
    } = useCompletedMap(mapId);

    console.log(isInitialMap)

    return (
        <StyledActionsContainer>
            <Display condition={isInitialMap}>
                <IconButton onClick={onMapImageModalOpen} isStylized>
                    <EditFillIcon/>
                </IconButton>
            </Display>
            <Display condition={isMyMap && !isInitialMap}>
                <IconButton onClick={deleteCompletedMap} isStylized>
                    <DeleteIcon/>
                </IconButton>
            </Display>
        </StyledActionsContainer>
    );
};

