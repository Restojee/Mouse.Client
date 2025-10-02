import { useCallback, useState } from "react";
import { StyledInput, StyledInputWrapper } from "@/ui/Form/styled";
import { Modal } from "@/ui/Modal/Modal";
import { StyledTextarea } from "@/ui/Textarea/styled";
import { CreateTipApiArg } from "@/api/codegen/genMouseMapsApi";
import { useInfo } from "@/modules/info/hooks/useInfo";
import { validationSchema } from "@/modules/info/schemas/validationSchema";
import { StyledBox } from "@/ui/Box";
import { Form } from "@/ui/Form/Form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";

export const CreateInfoModal = () => {
  const { createInfo, onModalClose, isInfoCreateModalOpen, selectedInfo, updateInfo } = useInfo();
  const [isLoading, setIsLoading] = useState(false);

  const { handleSubmit, register, reset } = useForm({
    mode: "onChange",
    reValidateMode: "onChange",
    resolver: yupResolver(validationSchema),
    values: {
      text: selectedInfo?.text || "",
      title: selectedInfo?.title || "",
    },
  });

  const onSubmitHandler = useCallback(
    async (data: CreateTipApiArg) => {
      setIsLoading(true);
      if (selectedInfo) {
        try {
          await updateInfo({ id: selectedInfo.id, ...data });
          return;
        } finally {
          setIsLoading(false);
        }
      }
      try {
        await createInfo(data);
        reset();
      } finally {
        setIsLoading(false);
      }
    },
    [createInfo, reset, selectedInfo, updateInfo],
  );

  return (
    <Form onSubmit={handleSubmit(onSubmitHandler)}>
      <Modal
        title={selectedInfo ? "Редактировать" : "Добавить полезную инфу"}
        onClose={onModalClose}
        isOpen={isInfoCreateModalOpen}
        accessDisabled={isLoading}
      >
        <StyledBox
          direction={"column"}
          width={"100%"}
          gap={20}
        >
          <StyledInputWrapper>
            <StyledInput
              {...register("title")}
              placeholder={"Заголовок"}
            />
          </StyledInputWrapper>
          <StyledTextarea
            placeholder={"Описание"}
            {...register("text")}
          />
        </StyledBox>
      </Modal>
    </Form>
  );
};
