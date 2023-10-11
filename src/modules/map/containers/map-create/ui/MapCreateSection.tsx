import { useMap } from '@/modules/map/common';
import { SvgIconPropsType } from '@/svg/common/types';
import { DoneRoundIcon } from '@/svg/DoneRoundIcon';
import { useMemo, useState } from 'react';
import { AddRoundIcon } from '@/svg/AddRoundIcon';
import { MapCreatePopup } from './MapCreatePopup';
import { useAppTheme } from '@/hooks/useAppTheme';
import PagePanelItem from '@/layout/page/PagePanelItem';

export const MapCreateSection = () => {
    const theme = useAppTheme();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isContentVisible, setIsContentVisible] = useState(false);
    const {
        onAddMap
    } = useMap()

    const onIconClickHandler = () => {
        if (isContentVisible) {
            onAddMap()
            setIsPopupOpen(false)
        } else {
            setIsContentVisible(true)
        }
    console.log(isContentVisible)
    }

    const IconComponent = useMemo((): (props: SvgIconPropsType) => JSX.Element => {
        if (isContentVisible) {
            return DoneRoundIcon;
        } else {
            return AddRoundIcon;
        }
    }, [isContentVisible]);

    return (
        <PagePanelItem
            onClick={onIconClickHandler}
            isContentVisible={isContentVisible}
            icon={<IconComponent
                    color={theme.colors.primary}
                />
            }
            content={
                <MapCreatePopup
                    isVisible={isPopupOpen}
                    onClickCreate={() => setIsPopupOpen(!isPopupOpen)}
                />
            }
        />
    );
};