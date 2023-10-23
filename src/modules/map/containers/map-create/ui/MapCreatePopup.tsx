import { MapParametersForm } from '../containers/create-form/MapParametersForm';
import { Input } from '@/ui/Input';
import { StyledBox } from '@/ui/Box';
import { AddImageIcon } from '@/svg/AddImageIcon';

type Props = {
    name: string;
    setName: (name: string) => void;
    isVisible: boolean;
    onImagePopupToggle: () => void;
    onMapCreate: () => void;
}
export const MapCreatePopup = (props: Partial<Props>) => {
    const {
        name,
        setName,
        onMapCreate,
        isVisible = true,
        onImagePopupToggle,
    } = props;

    const onNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value;
        setName?.(text);
    };
    const onKeyDownHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' && onMapCreate) {
            onMapCreate();
        }
    };

    return (
        <StyledBox
            position={'relative'}
        >
            <Input
                value={name}
                onKeyDown={onKeyDownHandler}
                onChange={onNameChangeHandler}
                placeholder="Номер карты @123456"
                inputAppend={
                    <AddImageIcon
                        onClick={onImagePopupToggle}
                        color="gray"
                    />
                }
            />
            {isVisible && <MapParametersForm/>}
        </StyledBox>
    );
};