import { ChangeEvent } from 'react';
import { theme } from '../ThemeProvider';
import { fireEvent, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import { PasswordField } from './PasswordField';
import { act } from 'react-dom/test-utils';

describe('<PasswordField />', () => {
  const id = 'PasswordField';

  it('should update input value', () => {
    const label = 'Password';
    let value = '';
    const expectedValue = 'my password';
    const handleChange = (
      e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      value = e.target.value;
    };

    const { getByTestId, rerender } = render(
      <MUIThemeProvider theme={theme}>
        <PasswordField
          label={label}
          value={value}
          handleChange={handleChange}
          id={id}
        />
      </MUIThemeProvider>
    );

    const input = getByTestId(id + '-password-field-input-text');

    fireEvent.input(input, { target: { value: expectedValue } });

    rerender(
      <MUIThemeProvider theme={theme}>
        <PasswordField
          label={label}
          value={value}
          handleChange={handleChange}
          id={id}
        />
      </MUIThemeProvider>
    );

    expect(input.getAttribute('value')).toBe(expectedValue);
  });

  it('should be able to switch its display status', () => {
    const label = 'Password';
    const value = 'password';
    const handleChange = jest.fn();

    const { getByTestId } = render(
      <MUIThemeProvider theme={theme}>
        <PasswordField
          label={label}
          value={value}
          handleChange={handleChange}
          id={id}
        />
      </MUIThemeProvider>
    );

    const input = getByTestId(id);
    const icon = input.querySelector(`#${id}-password-field-icon-button svg`);
    const baseInput = input.querySelector('input');

    //check init display status
    expect(icon).toHaveAttribute('data-testid', 'visible-icon');
    expect(baseInput?.type).toBe('password');

    fireEvent.click(getByTestId(id + '-password-field-icon-button'));

    //check display status after changing it
    expect(icon).toHaveAttribute('data-testid', 'hidden-icon');
    expect(baseInput?.type).toBe('text');
  });

  const allValidationTypes: ('error' | 'success' | 'warning')[] = [
    'success',
    'warning',
    'error',
  ];

  allValidationTypes.forEach((validationType) => {
    it(`should display ${validationType} style when validation is ${validationType}`, () => {
      const label = 'Password';
      let value = '';
      const expectedValue = 'too-short-password';
      const handleChange = (
        e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
      ) => {
        value = e.target.value;
      };
      const validate = () => ({
        color: validationType,
        message: 'Password too short',
      });

      const { getByTestId, rerender } = render(
        <MUIThemeProvider theme={theme}>
          <PasswordField
            label={label}
            value={value}
            handleChange={handleChange}
            id={id}
            validate={validate}
          />
        </MUIThemeProvider>
      );

      const input = getByTestId(id + '-password-field-input-text');
      const inputWrapper = getByTestId(id);

      fireEvent.input(input, { target: { value: expectedValue } });

      rerender(
        <MUIThemeProvider theme={theme}>
          <PasswordField
            label={label}
            value={value}
            handleChange={handleChange}
            id={id}
            validate={validate}
          />
        </MUIThemeProvider>
      );

      const helperText = inputWrapper.querySelector('.MuiFormHelperText-root');
      const labelElement = getByTestId(id + '-password-field-input-label');

      expect(helperText?.textContent).toBe('Password too short');
      expect(helperText).toHaveStyle(
        `color: ${theme.palette[validationType].main}`
      );
      expect(labelElement).toHaveStyle(
        `color: ${theme.palette[validationType].main}`
      );
      expect(inputWrapper.querySelector('fieldset')).toHaveStyle(
        `border-color :${theme.palette[validationType].main}`
      );
    });
  });

  it('should change display status of associated element', () => {
    const label = 'Password';
    const value = '';
    const handleChange = jest.fn();
    const ref1 = { current: { changeStatus: jest.fn(), validate: jest.fn() } };
    const ref2 = { current: { changeStatus: jest.fn(), validate: jest.fn() } };
    const id2 = 'PasswordField2';

    const { getByTestId } = render(
      <MUIThemeProvider theme={theme}>
        <PasswordField
          label={label}
          value={value}
          handleChange={handleChange}
          id={id}
          elementRef={ref1}
          associatedElementRef={ref2}
        />
        <PasswordField
          label={label}
          value={value}
          handleChange={handleChange}
          id={id2}
          elementRef={ref2}
          associatedElementRef={ref1}
        />
      </MUIThemeProvider>
    );

    const input1 = getByTestId(id);
    const input2 = getByTestId(id2);
    const icon1 = input1.querySelector(`#${id}-password-field-icon-button svg`);
    const icon2 = input2.querySelector(
      `#${id2}-password-field-icon-button svg`
    );
    const baseInput1 = input1.querySelector('input');
    const baseInput2 = input2.querySelector('input');

    //check init display status
    expect(icon1).toHaveAttribute('data-testid', 'visible-icon');
    expect(icon2).toHaveAttribute('data-testid', 'visible-icon');
    expect(baseInput1?.type).toBe('password');
    expect(baseInput2?.type).toBe('password');

    fireEvent.click(getByTestId(id + '-password-field-icon-button'));

    expect(icon1).toHaveAttribute('data-testid', 'hidden-icon');
    expect(icon2).toHaveAttribute('data-testid', 'hidden-icon');
    expect(baseInput1?.type).toBe('text');
    expect(baseInput2?.type).toBe('text');
  });

  it('should validate its value when validate method is called', () => {
    const expectedValue = 'password';
    const label = 'Password';
    let value = '';
    const handleChange = (
      e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
    ) => {
      value = e.target.value;
    };
    const ref = { current: { validate: jest.fn() } };
    const validateFunction = jest.fn(() => ({
      color: 'error' as const,
      message: 'Password too short',
    }));

    const { getByTestId, rerender } = render(
      <MUIThemeProvider theme={theme}>
        <PasswordField
          label={label}
          value={value}
          handleChange={handleChange}
          id={id}
          elementRef={ref}
          validate={validateFunction}
        />
      </MUIThemeProvider>
    );

    const input = getByTestId(id + '-password-field-input-text');

    fireEvent.input(input, { target: { value: expectedValue } });

    rerender(
      <MUIThemeProvider theme={theme}>
        <PasswordField
          label={label}
          value={value}
          handleChange={handleChange}
          id={id}
          elementRef={ref}
          validate={validateFunction}
        />
      </MUIThemeProvider>
    );

    let validateStatus;

    act(() => {
      validateStatus = ref.current.validate();
    });

    expect(validateFunction).toHaveBeenCalled();
    expect(validateStatus).toEqual({
      color: 'error' as const,
      message: 'Password too short',
    });
    expect(validateFunction).toHaveBeenLastCalledWith(value);
  });
});
