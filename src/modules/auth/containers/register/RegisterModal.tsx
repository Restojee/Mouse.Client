import { useRegister } from "@/modules/auth/hooks/useRegister";
import { AsyncSheet as Modal } from "@/ui/Sheet/view";
import { Register } from "./Register";

const RegisterModal = () => {
  const { onRegisterModalClose } = useRegister();

  return (
    <Modal
      withoutTitle
      isOpen={true}
      onClose={onRegisterModalClose}
      width={300}
      withoutButtons
    >
      <Register />
    </Modal>
  );
};

export default RegisterModal;
