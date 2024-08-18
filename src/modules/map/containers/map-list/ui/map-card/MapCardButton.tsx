import { Map } from '@/api/codegen/genMouseMapsApi';
import { useAppTheme } from '@/hooks/useAppTheme';
import { useMapView } from '@/modules/map/containers/map-view-modal/hooks/useMapView';
import { StyledMapCardButton } from '@/modules/map/styles/StyledMapCardButton';
import { Button } from '@/ui/Button';
import React, { useCallback } from 'react';

type MapCardButtonPropsType = {
    id: Map['id'];
    isMapHover: boolean;
}
export const MapCardButton = (props: MapCardButtonPropsType) => {
    const {
        id,
        isMapHover
    } = props

    const { theme } = useAppTheme();

    const { openMap } = useMapView();

    const onMapClickHandler = useCallback(async () => {
        try {
            await openMap(id);
        } catch (err) {
            console.log(err);
        }
    }, [id, openMap]);

    return (
        <StyledMapCardButton
            isHover={isMapHover}
            onClick={onMapClickHandler}
        >
            <Button
                bgColor={theme.colors.status.success}
                label="Открыть"
                size={"md"}
                color={theme.colors.brandColorContrastText}
            />
        </StyledMapCardButton>
    );
};

