import React from 'react';
import { useMediaQuery, Theme, Typography } from '@mui/material';
import { makeStyles } from '@mui/styles';

interface ClassProps {
  isSM: boolean;
}

const useStyles = makeStyles<Theme, ClassProps>({
  avatarButtonXs: {
    borderRadius: '50%',
    position: 'relative',
    width: '25px',
    height: '24px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
    '&:disabled': {
      cursor: 'default',
    },
  },
  avatarButtonSmall: {
    borderRadius: '50%',
    position: 'relative',
    width: '32px',
    height: '32px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
    '&:disabled': {
      cursor: 'default',
    },
  },
  avatarButtonLarge: {
    borderRadius: '50%',
    position: 'relative',
    width: '42px',
    height: '42px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',
    cursor: 'pointer',
    '&:disabled': {
      cursor: 'default',
    },
  },
  textContainer: {
    position: 'absolute',
    zIndex: 99,
  },
});

interface Props {
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  firstName?: string;
  lastName?: string;
  size?: string;
  disabled?: boolean;
  color?: string;
}

export function LetterAvatar({
  onClick,
  firstName,
  lastName,
  size,
  disabled,
  color,
}: Props) {
  const isSM = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));
  const classes = useStyles({ isSM });
  const isXs = size === 'xs';

  const firstNameCapitalLetter = () => {
    if (firstName) {
      return firstName.charAt(0);
    }
    return null;
  };

  const lastNameCapitalLetter = () => {
    if (lastName) {
      return lastName.charAt(0);
    }
    return null;
  };

  function sizeSelector() {
    if (size === 'small') {
      return classes['avatarButtonSmall'];
    }
    if (size === 'large') {
      return classes['avatarButtonLarge'];
    }
    if (isXs) {
      return classes['avatarButtonXs'];
    }
    return classes['avatarButtonSmall'];
  }

  return (
    <button
      type="button"
      onClick={onClick}
      className={sizeSelector()}
      disabled={disabled}
      style={{ backgroundColor: color ? color : 'grey' }}
    >
      <div className={classes['textContainer']}>
        <Typography
          sx={{
            fontWeight: isXs ? 500 : 600,
            color: '#FFF',
            fontSize: isXs ? '12px' : '14px',
          }}
        >
          {firstNameCapitalLetter()}
          {lastNameCapitalLetter()}
        </Typography>
      </div>
    </button>
  );
}
