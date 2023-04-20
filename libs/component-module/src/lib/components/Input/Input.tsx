import { Box, InputLabel, OutlinedInput, InputBaseProps } from '@mui/material';

interface Props extends InputBaseProps {
  label?: string;
}

// rename Input
export const Input = (props: Props) => {
  return (
    <Box>
      {props.label && (
        <InputLabel
          color={props.color}
          disabled={props.disabled}
          error={props.error}
          sx={(theme) => ({
            paddingBottom: theme.spacing(0.5),
          })}
        >
          {props.label}
        </InputLabel>
      )}
      <OutlinedInput
        {...props}
        notched={false}
        sx={{
          width: '100%',
        }}
      />
    </Box>
  );
};
