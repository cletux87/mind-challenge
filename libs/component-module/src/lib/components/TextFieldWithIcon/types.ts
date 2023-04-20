import { SxProps } from "@mui/material";
import { Theme } from "@mui/material/styles";
import { ChangeEventHandler, ReactElement } from "react";

export type TextFieldWithIconColors =
  | "primary"
  | "secondary"
  | "error"
  | "success"
  | "warning";

export type TextFieldWithIconProps = {
  label: string;
  value: string;
  type: string;
  placeholder?: string;
  handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
  handleClickOnIcon: VoidFunction;
  icon: ReactElement;
  id?: string;
  color?: TextFieldWithIconColors;
  helperText?: string;
  children?: JSX.Element | undefined | "";
  sx?: SxProps<Theme>;
  focused?: boolean;
};
