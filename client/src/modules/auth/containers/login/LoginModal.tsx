import { useLogin } from "@/modules/auth/hooks/useLogin";
import { Login } from "./Login";
import { Modal } from "@/ui/Modal/Modal";

const LoginModal = () => {
  const { onLoginModalClose } = useLogin();

  return (
    <Modal
      withoutTitle
      isOpen={true}
      onClose={onLoginModalClose}
      width={350}
      withoutButtons
    >
      <Login />
    </Modal>
  );
};

export default LoginModal;
