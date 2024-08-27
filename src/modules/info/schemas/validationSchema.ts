import * as yup from "yup";

export const validationSchema = yup.object({
  title: yup
    .string()
    .trim()
    .min(1, "Некорректный заголовок")
    .max(150, "Максимальное количество символов - 150")
    .required(),
  text: yup
    .string()
    .trim()
    .min(1, "Некорректное описание")
    .max(500, "Максимальное количество символов - 500")
    .required(),
});
