import { StyledBox } from '@/ui/Box';
import { ImageForm } from '@/ui/ImageForm/ImageForm';
import { Modal } from '@/ui/Modal/Modal';
import { StyledModalWrapper } from '@/ui/Modal/styled';
import { Paper } from '@/ui/Paper';
import { Typography } from '@/ui/Typography';

type ImageUploadModalPropsType = {
    onClose?: () => void;
    isOpen?: boolean;
}
export const ImageUploadModal = (props: ImageUploadModalPropsType) => {
    return (
        <StyledModalWrapper>
            {/*<Modal>*/}
            {/*    <Paper>*/}
            {/*        <Typography margin={'0 0 20px 0'}>*/}
            {/*            Добавить свой скрин*/}
            {/*        </Typography>*/}
            {/*        <ImageForm*/}
            {/*            onChange={() => {}}*/}
            {/*            value={''}*/}
            {/*        />*/}
            {/*        <StyledBox>*/}

            {/*        </StyledBox>*/}
            {/*    </Paper>*/}
            {/*</Modal>*/}

        </StyledModalWrapper>
    );
};

