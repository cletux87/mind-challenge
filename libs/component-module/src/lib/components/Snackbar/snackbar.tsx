import React, { useEffect, useState } from 'react';
import { Snackbar as MaterialSnackbar, Theme } from '@mui/material';
import { Alert } from '@mui/lab';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles((theme: Theme) => {
  return {
    defaultError: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& .MuiAlert-message': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      '& .MuiAlert-icon': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    success: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.palette.primary.main,
      '& .MuiAlert-message': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      '& .MuiAlert-icon': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    variantStandard: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& .MuiAlert-message': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      '& .MuiAlert-icon': {
        color: theme.palette.common.white,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
    variantOutlined: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& .MuiAlert-message': {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
      borderColor: theme.palette.primary.main,
      '& .MuiAlert-icon': {
        color: theme.palette.primary.main,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      },
    },
  };
});

export interface SnackbarProps {
  variant?: 'standard' | 'outlined' | 'filled';
  severity?: 'success' | 'error';
  text: string;
  onClose?: () => void;
  open?: boolean;
}

export function Snackbar({
  variant,
  severity = 'success',
  text,
  onClose,
  open = false,
}: SnackbarProps) {
  const classes = useStyles();
  const [severityWrapper, setSeverityWrapper] = useState(severity);

  useEffect(() => {
    const severitySelector = () => {
      setSeverityWrapper(severity === 'error' ? 'error' : 'success');
    };
    severitySelector();
  }, []);

  function classNameSelector() {
    if (severityWrapper === 'success') {
      if (variant === 'standard') {
        return classes.variantStandard;
      } else if (variant === 'outlined') {
        return classes.variantOutlined;
      } else if (variant === 'filled') {
        return classes.success;
      }
    } else {
      return classes.defaultError;
    }
    return classes.variantStandard;
  }

  return (
    <MaterialSnackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      onClose={onClose}
      open={open}
    >
      <Alert
        variant={variant}
        severity={severityWrapper}
        onClose={onClose}
        className={classNameSelector()}
      >
        {text}
      </Alert>
    </MaterialSnackbar>
  );
}
