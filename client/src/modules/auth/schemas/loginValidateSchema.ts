import { LoginRequest } from "@/api/codegen/genMouseMapsApi";
import * as yup from "yup";

export const loginValidateSchema: yup.ObjectSchema<LoginRequest> = yup.object({
  userName: yup
    .string()
    .trim()
    .min(1, "Некорректный логин")
    .max(16, "Максимальное количество символов - 16")
    .required("Это обязательное поле"),
  password: yup
    .string()
    .trim()
    .min(1, "Некорректный пароль")
    .max(50, "Максимальное количество символов - 50")
    .required("Это обязательное поле"),
});
