import * as yup from "yup";

export type ChangePasswordForm = {
  password?: string;
  confirmPassword?: string;
};

export const changePasswordValidation: yup.ObjectSchema<ChangePasswordForm> = yup.object({
  password: yup
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .min(6, "Некорректный пароль")
    .max(50, "Максимальное количество символов - 50"),
  confirmPassword: yup
    .string()
    .trim()
    .transform((val) => (val === "" ? undefined : val))
    .oneOf([yup.ref("password"), undefined], "Пароли должны совпадать")
    .when("password", {
      is: (val: string | undefined) => !!val,
      then: (schema) => schema.required("Это обязательное поле"),
      otherwise: (schema) => schema.notRequired(),
    }),
});
