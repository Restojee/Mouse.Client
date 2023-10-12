import { MapParametersForm } from '../containers/create-form/MapParametersForm';
import { useMapCreate } from '../hooks/useMapCreate';
import { Input } from '@/ui/Input';
import { StyledBox } from '@/ui/Box';
import { AddImageIcon } from '@/svg/AddImageIcon';

type Props = {
    isVisible: boolean;
    onClickCreate: () => void;
}
export const MapCreatePopup = (props: Partial<Props>) => {
    const { isVisible = true, onClickCreate } = props;
    const {
        name,
        setName,
    } = useMapCreate();

    const onNameChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        const text = e.currentTarget.value;
        setName(text);
    };

    return (
        <StyledBox
            position={'relative'}
        >
            <Input
                onChange={onNameChangeHandler}
                value={name}
                placeholder="Номер карты @123456"
                inputAppend={
                    <AddImageIcon
                        onClick={onClickCreate}
                        color="gray"
                    />
                }
            />
            {isVisible && <MapParametersForm/>}
        </StyledBox>
    );
};