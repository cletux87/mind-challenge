import {
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from '@mui/material';
import { TextFieldWithIconProps } from './types';

const TextFieldWithIcon = ({
  label,
  type = 'text',
  handleClickOnIcon,
  value,
  handleChange,
  icon,
  placeholder,
  id,
  color = 'primary',
  children,
  sx,
  focused,
}: TextFieldWithIconProps) => {
  return (
    <FormControl
      focused={focused}
      sx={(theme) => ({
        width: '100%',
        [theme.breakpoints.up('sm')]: {
          //  minWidth: theme.custom.inputWidth.small
        },
        ...(typeof sx === 'function' ? sx(theme) : {}),
      })}
      variant="outlined"
    >
      <InputLabel
        htmlFor={id}
        color={color}
        data-testid={`${id || ''}-input-label`}
      >
        {label}
      </InputLabel>
      <OutlinedInput
        sx={(theme) => ({
          //borderRadius: theme.custom.inputRadius.default
        })}
        data-testid={id}
        placeholder={placeholder}
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        color={color}
        inputProps={{
          'data-testid': `${id || ''}-input-text`,
        }}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              data-testid={`${id || ''}-icon-button`}
              aria-label="icon button"
              onClick={handleClickOnIcon}
              edge="end"
              id={`${id || ''}-icon-button`}
            >
              {icon}
            </IconButton>
          </InputAdornment>
        }
        label={label}
      />
      {children}
    </FormControl>
  );
};

export default TextFieldWithIcon;
