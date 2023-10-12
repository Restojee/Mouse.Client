import { useState } from 'react';
import { useMapCreate } from '../hooks/useMapCreate';
import { DoneRoundIcon } from '@/svg/DoneRoundIcon';
import { Display } from '@/ui/Display';
import { AddRoundIcon } from '@/svg/AddRoundIcon';
import { MapCreatePopup } from './MapCreatePopup';
import { useAppTheme } from '@/hooks/useAppTheme';
import PagePanelItem from '@/layout/page/PagePanelItem';

export const MapCreateSection = () => {
    const theme = useAppTheme();
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isContentVisible, setIsContentVisible] = useState(false);

    const {
        onMapCreate
    } = useMapCreate()

    const { isValid } = useMapCreate();

    const onSubmitHandler = async () => {
        await onMapCreate();
        setIsPopupOpen(false);
    };

    const onIconClickHandler = async () => {
        if (isContentVisible) {
            await onSubmitHandler()
        } else {
            setIsContentVisible(true)
        }
        setIsPopupOpen(false)
    }

    return (
        <PagePanelItem
            disabled={!isValid && isContentVisible}
            type={isContentVisible ? 'submit' : undefined}
            isContentVisible={isContentVisible}
            onClick={onIconClickHandler}
            content={
                <MapCreatePopup
                    isVisible={isPopupOpen}
                    onClickCreate={() => setIsPopupOpen(!isPopupOpen)}
                />
            }
        >
            <Display condition={isContentVisible}>
                <DoneRoundIcon color={theme.colors.primary}/>
            </Display>
            <Display condition={!isContentVisible}>
                <AddRoundIcon color={theme.colors.primary}/>
            </Display>
        </PagePanelItem>
    );
};