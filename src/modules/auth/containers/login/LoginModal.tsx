import { useLogin } from '@/modules/auth/hooks/useLogin';
import { Login } from './Login';
import { Modal } from '@/ui/Modal/Modal';

const LoginModal = () => {
    const {
        isLoginModalOpen,
        onLoginModalClose,
    } = useLogin();

    return (
        <Modal
            title={'Войти'}
            isOpen={isLoginModalOpen}
            onClose={onLoginModalClose}
            width={300}
            withoutButtons
        >
            <Login/>
        </Modal>
    );
};

export default LoginModal;