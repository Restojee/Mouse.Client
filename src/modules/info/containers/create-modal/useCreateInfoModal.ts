import { useCallback, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateTipApiArg } from "@/api/codegen/genMouseMapsApi";
import { useAppTheme } from "@/hooks/useAppTheme";
import { useInfo } from "@/modules/info/hooks/useInfo";
import { validationSchema } from "@/modules/info/schemas/validationSchema";

type UseCreateInfoModalProps = {
  onClose: () => void;
};

export const useCreateInfoModal = ({ onClose }: UseCreateInfoModalProps) => {
  const { createInfo, selectedInfo, updateInfo } = useInfo();
  const { theme } = useAppTheme();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm({
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
      try {
        if (selectedInfo) {
          await updateInfo({ id: selectedInfo.id, ...data });
        } else {
          await createInfo(data);
        }
        onClose();
      } finally {
        setIsLoading(false);
      }
    },
    [createInfo, selectedInfo, updateInfo, onClose],
  );

  const onFormSubmit = useMemo(() => form.handleSubmit(onSubmitHandler), [form, onSubmitHandler]);

  const submitLabel = selectedInfo ? "Сохранить" : "Добавить";
  const cancelColor = theme.colors.textOnSecondary;
  const cancelBgColor = theme.colors.default.paperAccent;
  const submitColor = theme.colors.brandColorContrastText;

  return {
    register: form.register,
    onFormSubmit,
    isLoading,
    submitLabel,
    cancelColor,
    cancelBgColor,
    submitColor,
  };
};
