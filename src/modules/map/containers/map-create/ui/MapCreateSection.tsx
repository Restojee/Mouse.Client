import { useAppSelector } from '@/hooks/useAppSelector';
import { selectIsAuth } from '@/modules/auth/slice';
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

    const isAuth = useAppSelector(selectIsAuth);

    const {
        name,
        setName,
        onMapCreate,
    } = useMapCreate();

    const { isValid } = useMapCreate();

    const onSubmitHandler = async () => {
        await onMapCreate();
    };

    const onIconClickHandler = async () => {
        if (isContentVisible) {
            await onSubmitHandler();
        } else {
            setIsContentVisible(true);
            setIsPopupOpen(false);
        }
    };

    return (
        <PagePanelItem
            disabled={(!isValid && isContentVisible) || !isAuth}
            type={isContentVisible ? 'submit' : undefined}
            isContentVisible={isContentVisible}
            onClick={onIconClickHandler}
            content={
                <MapCreatePopup
                    name={name}
                    setName={setName}
                    isVisible={isPopupOpen}
                    onImagePopupToggle={() => setIsPopupOpen(!isPopupOpen)}
                    onMapCreate={onSubmitHandler}
                />
            }
        >
            <Display condition={isContentVisible && isValid}>
                <DoneRoundIcon color={theme.colors.primary}/>
            </Display>
            <Display condition={!isContentVisible}>
                <AddRoundIcon color={theme.colors.primary}/>
            </Display>
        </PagePanelItem>
    );
};