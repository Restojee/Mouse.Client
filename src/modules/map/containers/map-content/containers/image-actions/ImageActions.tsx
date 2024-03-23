import { useMap } from '@/modules/map/common';
import { useMapView } from '@/modules/map/containers/map-view-modal/hooks/useMapView';
import { useCompletedMap } from '../completed-images/hooks/useCompletedMap';
import { IconButton } from '@/ui/Button/IconButton';
import { StyledActionsContainer } from './styles';
import { EditFillIcon } from '@/svg/EditFillIcon';
import { DeleteIcon } from '@/svg/DeleteIcon';
import { Display } from '@/ui/Display';

export const ImageActions = () => {
    const { levelId } = useMapView();

    const {
        onMapImageModalOpen
    } = useMap()

    const {
        isMyMap,
        activeMapCompleted,
        deleteCompletedMap,
    } = useCompletedMap(levelId);

    return (
        <StyledActionsContainer>
            <Display condition={Boolean(!activeMapCompleted)}>
                <IconButton onClick={onMapImageModalOpen} isStylized>
                    <EditFillIcon/>
                </IconButton>
            </Display>
            <Display condition={isMyMap && Boolean(activeMapCompleted)}>
                <IconButton onClick={deleteCompletedMap} isStylized>
                    <DeleteIcon/>
                </IconButton>
            </Display>
        </StyledActionsContainer>
    );
};

