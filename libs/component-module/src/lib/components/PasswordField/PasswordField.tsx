import { ChangeEvent, useEffect, useRef, useState } from 'react';
import { Box, FormHelperText } from '@mui/material';
import { PasswordFieldProps, PasswordFieldRef } from './types';
import TextFieldWithIcon from '../TextFieldWithIcon';
import { ValidateFunctionReturnValue } from '../../types/utils';

const visibleIcon = (
  <svg
    width="20"
    height="13"
    viewBox="0 0 20 13"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-testid="visible-icon"
  >
    <path
      d="M10.0002 4.005C11.0611 4.005 12.0785 4.42643 12.8286 5.17657C13.5788 5.92672 14.0002 6.94413 14.0002 8.005C14.0002 9.06587 13.5788 10.0833 12.8286 10.8334C12.0785 11.5836 11.0611 12.005 10.0002 12.005C8.93932 12.005 7.9219 11.5836 7.17176 10.8334C6.42161 10.0833 6.00019 9.06587 6.00019 8.005C6.00019 6.94413 6.42161 5.92672 7.17176 5.17657C7.9219 4.42643 8.93932 4.005 10.0002 4.005ZM10.0002 5.505C9.33714 5.505 8.70126 5.76839 8.23242 6.23723C7.76358 6.70607 7.50019 7.34196 7.50019 8.005C7.50019 8.66804 7.76358 9.30393 8.23242 9.77277C8.70126 10.2416 9.33714 10.505 10.0002 10.505C10.6632 10.505 11.2991 10.2416 11.768 9.77277C12.2368 9.30393 12.5002 8.66804 12.5002 8.005C12.5002 7.34196 12.2368 6.70607 11.768 6.23723C11.2991 5.76839 10.6632 5.505 10.0002 5.505ZM10.0002 0.5C14.6132 0.5 18.5962 3.65 19.7012 8.064C19.7496 8.25695 19.7194 8.46122 19.6172 8.63187C19.5149 8.80253 19.3491 8.9256 19.1562 8.974C18.9632 9.0224 18.759 8.99217 18.5883 8.88997C18.4177 8.78776 18.2946 8.62194 18.2462 8.429C17.7832 6.59247 16.7204 4.96306 15.2262 3.79913C13.7321 2.6352 11.8921 2.00338 9.99813 2.00384C8.10414 2.0043 6.2645 2.63701 4.77092 3.80167C3.27733 4.96632 2.21529 6.59625 1.75319 8.433C1.72935 8.5286 1.68692 8.61857 1.62831 8.69778C1.56971 8.77698 1.49608 8.84387 1.41162 8.89461C1.32717 8.94536 1.23354 8.97898 1.1361 8.99354C1.03865 9.00811 0.939289 9.00333 0.843686 8.9795C0.748084 8.95566 0.658112 8.91323 0.578909 8.85463C0.499705 8.79602 0.43282 8.72239 0.382073 8.63793C0.331326 8.55348 0.29771 8.45986 0.283145 8.36241C0.26858 8.26496 0.273351 8.1656 0.297186 8.07C0.839502 5.90729 2.08884 3.98777 3.84679 2.61627C5.60474 1.24476 7.77052 0.499912 10.0002 0.5Z"
      fill="white"
      fillOpacity="0.56"
    />
  </svg>
);

const hiddenIcon = (
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    data-testid="hidden-icon"
  >
    <path
      d="M0.220221 0.220317C0.0932031 0.347305 0.0159749 0.515659 0.00257841 0.694768C-0.0108181 0.873877 0.0405069 1.05185 0.147221 1.19632L0.220221 1.28032L4.25422 5.31532C2.28725 6.69394 0.883107 8.73537 0.299221 11.0653C0.2542 11.2571 0.286459 11.4589 0.389026 11.6272C0.491593 11.7954 0.65623 11.9165 0.847357 11.9643C1.03848 12.0121 1.24075 11.9828 1.41044 11.8827C1.58013 11.7826 1.70362 11.6197 1.75422 11.4293C2.27312 9.36132 3.55112 7.56426 5.33422 6.39532L7.14422 8.20532C6.42122 8.96081 6.02281 9.9694 6.03434 11.015C6.04588 12.0607 6.46643 13.0602 7.20592 13.7996C7.94542 14.539 8.94504 14.9593 9.99069 14.9707C11.0363 14.982 12.0449 14.5835 12.8002 13.8603L18.7192 19.7803C18.853 19.9145 19.0327 19.9931 19.2221 20.0002C19.4115 20.0073 19.5965 19.9425 19.7401 19.8187C19.8836 19.6949 19.9749 19.5214 19.9957 19.3331C20.0166 19.1447 19.9653 18.9554 19.8522 18.8033L19.7792 18.7193L13.6662 12.6053L13.6672 12.6033L12.4672 11.4053L9.59722 8.53532H9.59922L6.71922 5.65832L6.72022 5.65632L5.58722 4.52632L1.28022 0.220317C1.1396 0.0798662 0.948971 0.000976562 0.750221 0.000976562C0.55147 0.000976562 0.360846 0.0798662 0.220221 0.220317ZM8.20422 9.26532L11.7392 12.8013C11.2677 13.2567 10.6362 13.5087 9.98072 13.503C9.32523 13.4973 8.69819 13.2344 8.23467 12.7709C7.77115 12.3073 7.50823 11.6803 7.50254 11.0248C7.49684 10.3693 7.74883 9.73782 8.20422 9.26632V9.26532ZM10.0002 3.50032C9.00022 3.50032 8.03022 3.64832 7.11122 3.92532L8.34822 5.16132C10.4878 4.73767 12.7083 5.1524 14.5507 6.31975C16.3931 7.48709 17.7165 9.31779 18.2472 11.4333C18.299 11.6222 18.4227 11.7834 18.5918 11.8823C18.7609 11.9813 18.962 12.0101 19.1521 11.9627C19.3421 11.9152 19.5061 11.7953 19.6089 11.6286C19.7117 11.4618 19.7452 11.2614 19.7022 11.0703C19.1599 8.90777 17.9108 6.98838 16.153 5.61689C14.3953 4.2454 12.2297 3.50045 10.0002 3.50032ZM10.1952 7.01032L13.9962 10.8103C13.9471 9.81822 13.5308 8.87983 12.8283 8.17754C12.1258 7.47525 11.1873 7.05922 10.1952 7.01032Z"
      fill="white"
      fillOpacity="0.7"
    />
  </svg>
);

const PASSWORD_STATUS = {
  VISIBLE: 0,
  HIDDEN: 1,
};

export const PasswordField = ({
  label,
  value,
  handleChange,
  id,
  color = 'primary',
  validate,
  elementRef,
  associatedElementRef,
  validateOnInput = true,
}: PasswordFieldProps) => {
  const [validationStatus, setValidationStatus] =
    useState<ValidateFunctionReturnValue>();
  const [status, setStatus] = useState(PASSWORD_STATUS.HIDDEN);

  //use ref value to get value up to date in callback
  const refValue = useRef<string>(value);

  const switchStatus = () => {
    setStatus((prevState) =>
      prevState === PASSWORD_STATUS.VISIBLE
        ? PASSWORD_STATUS.HIDDEN
        : PASSWORD_STATUS.VISIBLE
    );
  };

  const handleClickOnIcon = () => {
    switchStatus();
    //call associated ref action
    if (
      associatedElementRef?.current &&
      associatedElementRef.current.changeStatus
    ) {
      associatedElementRef.current.changeStatus();
    }
  };

  const onChange = (e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    handleChange(e);
  };

  const onValidation = () => {
    if (!validate) return { message: '', color: 'success' as const };
    const validationStatus = validate(refValue.current);
    setValidationStatus(validationStatus);
    return validationStatus;
  };

  useEffect(() => {
    if (!value) return;
    refValue.current = value;
    validateOnInput && onValidation();
  }, [value]);

  //set ref methods
  useEffect(() => {
    if (!elementRef) return;
    elementRef.current.changeStatus = switchStatus;
    elementRef.current.validate = onValidation;
  }, [elementRef]);

  const activeColor = validationStatus ? validationStatus.color : color;

  return (
    <Box data-testid={id}>
      <TextFieldWithIcon
        sx={(theme) => ({
          '.MuiOutlinedInput-notchedOutline': {
            // borderRadius: theme.custom.inputRadius.default
          },
          '.MuiInputBase-root': {
            marginBottom: '0',
          },
          position: 'relative',
        })}
        label={label}
        value={value}
        handleChange={onChange}
        icon={status === PASSWORD_STATUS.VISIBLE ? hiddenIcon : visibleIcon}
        handleClickOnIcon={handleClickOnIcon}
        type={status === PASSWORD_STATUS.VISIBLE ? 'text' : 'password'}
        id={`${id || ''}-password-field`}
        color={activeColor}
        focused={validationStatus ? true : undefined}
      >
        {validationStatus && (
          <FormHelperText
            sx={(theme) => ({
              // color: theme.palette[activeColor].main,
              position: 'absolute',
              top: '100%',
            })}
          >
            {validationStatus.message}
          </FormHelperText>
        )}
      </TextFieldWithIcon>
    </Box>
  );
};

PasswordField.baseRef = (): PasswordFieldRef => ({
  changeStatus: () => {
    throw new Error('changeStatus method must be implemented');
  },
  validate: () => {
    throw new Error('validate method status must be implemented');
  },
});
