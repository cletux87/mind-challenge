import {ChangeEventHandler, MutableRefObject} from "react";
import { ValidateFunction, ValidateFunctionReturnValue } from "../../types/utils";

export type PasswordFieldRef = {
  changeStatus?: VoidFunction;
  validate?: () => ValidateFunctionReturnValue;
};

export type PasswordFieldProps = {
  label: string;
  value: string;
  handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  id?: string;
  validate?: ValidateFunction;
  color?: "primary" | "secondary";
  elementRef?: MutableRefObject<PasswordFieldRef>;
  associatedElementRef?: MutableRefObject<PasswordFieldRef>;
  validateOnInput?: boolean;
};
