export type ValidateFunction<T = string> = (
  v: T
) => ValidateFunctionReturnValue;

export type ValidateFunctionReturnValue = {
  message?: string;
  color: 'success' | 'error' | 'warning';
};
