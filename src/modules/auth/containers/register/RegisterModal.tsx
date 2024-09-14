import { useLogin } from "@/modules/auth/hooks/useLogin";
import { Register } from "./Register";
import { Modal } from "@/ui/Modal/Modal";

const RegisterModal = () => {
  const { onLoginModalClose } = useLogin();

  return (
    <Modal
      withoutTitle
      isOpen={true}
      onClose={onLoginModalClose}
      width={300}
      withoutButtons
    >
      <Register />
    </Modal>
  );
};

export default RegisterModal;
