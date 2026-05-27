import { RegisterRequest } from "@/api/codegen/genMouseMapsApi";
import * as yup from "yup";

export type RegisterFormValues = RegisterRequest & {
  confirmPassword: string;
  personalDataAccepted: boolean;
};

export const registerValidation: yup.ObjectSchema<RegisterFormValues> = yup.object({
  userName: yup
    .string()
    .trim()
    .min(2, "Некорректный логин")
    .max(16, "Максимальное количество символов - 16")
    .required("Это обязательное поле"),
  inviteToken: yup
    .string()
    .trim()
    .min(1, "Некорректный код")
    .max(500, "Максимальное количество символов - 500")
    .required(),
  password: yup
    .string()
    .trim()
    .min(6, "Некорректный пароль")
    .max(50, "Максимальное количество символов - 50")
    .required("Это обязательное поле"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), undefined], "Пароли должны совпадать")
    .required("Это обязательное поле"),
  personalDataAccepted: yup
    .boolean()
    .oneOf([true], "Нужно согласие на обработку персональных данных")
    .required("Нужно согласие на обработку персональных данных"),
});
