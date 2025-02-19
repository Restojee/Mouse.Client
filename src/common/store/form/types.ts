import { ChangeEvent } from "react";
import Validated from "@common/store/Validate";

export type GetIsValid = () => boolean;
export type GetError = () => string
export type GetValue = () => string
export type HandleChange = (value: string) => void;
export type ValidatorHandler = (value: any) => Validated;
export interface InputPropsOptions {
  value: GetValue,
  onChange: HandleChange
}

export interface InputPropsGetter {
  value: string;
  onChange(event: ChangeEvent<HTMLInputElement>): void;
}

export interface ValidateOptions {
  validate: Validated;
}

export type FieldPropsOptions = ValidateOptions;
export type SubmitPropsOptions = ValidateOptions;