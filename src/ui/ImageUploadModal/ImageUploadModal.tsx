import { StyledBox } from '@/ui/Box';
import { ImageForm } from '@/ui/ImageForm/ImageForm';
import { Modal } from '@/ui/Modal/Modal';
import { useState } from 'react';

type ImageUploadModalPropsType = {
    onClose: () => void;
    onAccess: (image: string) => Promise<boolean>;
    isOpen?: boolean;
    title: string;
}
export const ImageUploadModal = (props: ImageUploadModalPropsType) => {
    const [image, setImage] = useState<string | null>(null);

    const onAccessHandler = async () => {
        if (image) {
            const res = await props.onAccess(image);
            if(res) {
                props.onClose();
                setImage(null)
            }
        }
    };

    return (
        <Modal
            isOpen={props.isOpen}
            title={props.title}
            onClose={props.onClose}
            onAccess={onAccessHandler}
            width={420}
        >
            <ImageForm
                width={'100%'}
                height={'180px'}
                onChange={setImage}
                value={image}
            />
            <StyledBox>

            </StyledBox>
        </Modal>
    );
};

