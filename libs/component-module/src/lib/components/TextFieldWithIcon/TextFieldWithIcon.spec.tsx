import '@testing-library/jest-dom';
import { fireEvent, render } from '@testing-library/react';
import TextFieldWithIcon from './TextFieldWithIcon';
import { theme } from '../ThemeProvider';
import { ThemeProvider as MUIThemeProvider } from '@mui/material';
import { TextFieldWithIconColors } from './types';

describe('<TextFieldWithIcon />', () => {
  const id = 'TextFieldWithIcon';
  const icon = (
    <svg
      width={'30'}
      height={'30'}
      fill="white"
      focusable="false"
      aria-hidden="true"
      viewBox="0 0 24 24"
      data-testid="VisibilityIcon"
    >
      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z"></path>
    </svg>
  );

  describe('Logic tests', () => {
    it('should display the placeholder', () => {
      const value = 'Value';
      const placeholder = 'Placeholder';
      const setValue = jest.fn();
      const handleClickOnIcon = jest.fn();

      const { getByTestId } = render(
        <MUIThemeProvider theme={theme}>
          <TextFieldWithIcon
            id={id}
            icon={icon}
            handleClickOnIcon={handleClickOnIcon}
            label="Name"
            value={value}
            handleChange={setValue}
            type="text"
            placeholder={placeholder}
          />
        </MUIThemeProvider>
      );

      const input = getByTestId(id + '-input-text');

      expect(input.getAttribute('placeholder')).toBe(placeholder);
    });

    it('should render an icon next to input', () => {
      const value = 'Value';
      const setValue = jest.fn();
      const handleClickOnIcon = jest.fn();

      const { container } = render(
        <MUIThemeProvider theme={theme}>
          <TextFieldWithIcon
            id={id}
            icon={icon}
            handleClickOnIcon={handleClickOnIcon}
            label="Name"
            value={value}
            handleChange={setValue}
            type="text"
          />
        </MUIThemeProvider>
      );

      const iconElement = container.querySelector(`#${id}-icon-button *`);

      expect(iconElement?.outerHTML).toBe(render(icon).container.innerHTML);
    });

    it('should be able to change input value', () => {
      let value = 'Value';
      const setValue = (v: string) => {
        value = v;
      };
      const handleClickOnIcon = jest.fn();
      const expectedValue = 'My name';

      const { getByTestId, rerender } = render(
        <MUIThemeProvider theme={theme}>
          <TextFieldWithIcon
            id={id}
            icon={icon}
            handleClickOnIcon={handleClickOnIcon}
            label="Name"
            value={value}
            handleChange={(e) => setValue(e.target.value)}
            type="text"
          />
        </MUIThemeProvider>
      );

      const input = getByTestId(id + '-input-text');

      fireEvent.change(input, { target: { value: expectedValue } });
      rerender(
        <MUIThemeProvider theme={theme}>
          <TextFieldWithIcon
            id={id}
            icon={icon}
            handleClickOnIcon={handleClickOnIcon}
            label="Name"
            value={value}
            handleChange={(e) => setValue(e.target.value)}
            type="text"
          />
        </MUIThemeProvider>
      );

      expect(input.getAttribute('value')).toBe(expectedValue);
    });

    it('should render a clickable icon button', () => {
      const value = 'Value';
      const setValue = jest.fn();
      const handleClickOnIcon = jest.fn();

      const { getByLabelText } = render(
        <MUIThemeProvider theme={theme}>
          <TextFieldWithIcon
            id={id}
            icon={icon}
            handleClickOnIcon={handleClickOnIcon}
            label="Name"
            value={value}
            handleChange={setValue}
            type="text"
          />
        </MUIThemeProvider>
      );

      const iconButton = getByLabelText('icon button');

      fireEvent.click(iconButton);

      expect(handleClickOnIcon).toHaveBeenCalledTimes(1);
    });
  });

  /*
  describe('Style tests', () => {
    const allColorsToTest: TextFieldWithIconColors[] = [
      // TODO: verify why default value from TextFieldWithIcon fails the test
      // if color = "secondary" in TextFiledWithIcon it will fails the
      // secondary color test. As primary is  the default color it fails
      // "primary",
      'secondary',
      'error',
      'warning',
    ];

    allColorsToTest.forEach((color) => {
      it(`should render as ${color}`, () => {
        const value = 'Value';
        const setValue = jest.fn();
        const handleClickOnIcon = jest.fn();

        const { getByTestId } = render(
          <MUIThemeProvider theme={theme}>
            <TextFieldWithIcon
              id={id}
              icon={icon}
              handleClickOnIcon={handleClickOnIcon}
              label="Name"
              value={value}
              handleChange={setValue}
              type="text"
              focused={true}
              color={color}
            />
          </MUIThemeProvider>
        );

        const input = getByTestId(id);
        const labelElement = getByTestId(id + '-input-label');

        expect(input.querySelector('fieldset')).toHaveStyle(
          `border-color :${theme.palette[color].main}`
        );
        expect(labelElement).toHaveStyle(`color: ${theme.palette[color].main}`);
      });
    });
  });
  */
});
