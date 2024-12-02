import { FormSchema } from "@common/store/form/FormSchema";

export type GetIsValid = () => boolean;
export type GetError = () => string
export type GetValue = () => string
export type HandleChange = (value: string) => void;

export interface InputPropsOptions {
  value: GetValue,
  onChange: HandleChange
}

export interface InputPropsGetter {
  value: string;
  onChange: HandleChange
}

export interface CreateStateArgs {
  withForm: <E extends {}>(value: E) => FormSchema<E>
}