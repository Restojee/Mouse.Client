import { ReactNode, Suspense } from 'react';
import { AsyncModalContent } from './AsyncModalContent';

export type ModalPropsType = {
    isOpen?: boolean;
    onClose: () => void;
    onAccess: () => void;
    text?: string;
    children?: ReactNode;
}
export const Modal = ({ isOpen, ...props }: ModalPropsType) => {

    if (!isOpen) {
        return null;
    }

    return (
        <Suspense>
            <AsyncModalContent {...props}/>
        </Suspense>
    )
};

