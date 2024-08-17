import React, { LazyExoticComponent, Suspense } from 'react';
import { AppModalTypes, selectAppModalType } from '@/bll/appReducer';
import { useAppSelector } from '@/hooks/useAppSelector';

const modals: Record<AppModalTypes, LazyExoticComponent<() => JSX.Element>> = {
    'map-tags-update': React.lazy(() => import('../tag/components/TagsModal')),
    'login': React.lazy(() => import('../auth/containers/login/LoginModal')),
    'user': React.lazy(() => import('../user/containers/user-modal/UserModal')),
    'register': React.lazy(() => import('../auth/containers/register/RegisterModal')),
}

export const AsyncModals = () => {
    const modalType = useAppSelector(selectAppModalType);

    if (!modalType) {
        return null;
    }

    const ModalComponent = modals[modalType];

    return (
        <Suspense fallback={null}>
            <ModalComponent/>
        </Suspense>
    );
};

