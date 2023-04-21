import { Snackbar } from '@mind-challenge4/component-module';
import { AccountsDTO } from '@mind-challenge4/share-types';
import {
  Box,
  Card,
  Typography,
  Skeleton,
  Switch,
  Input,
  Select,
  MenuItem,
} from '@mui/material';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createAccount, updateAccount } from '../../services/account';
import { SpinnerButton } from './SpinnerButton';

const SmallSpace = ({
  title,
  value,
  editValue = false,
  onChange,
  options,
  isTime = false,
}: {
  title: string;
  value: string;
  editValue?: boolean;
  onChange?: Dispatch<SetStateAction<any>>;
  options?: string[];
  isTime?: boolean;
}) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      sx={(theme) => ({ gap: theme.spacing(1) })}
      flexBasis="50%"
    >
      <Typography>{title}:</Typography>
      {(() => {
        if (editValue && isTime) {
          return (
            <DesktopDatePicker
              label=""
              // inputFormat="MM/DD/YYYY"
              value={new Date(value)}
              // onChange={handleChange}
              // renderInput={(params) => <TextField {...params} />}
            />
          );
        }
        if (editValue && !options) {
          return (
            <Input
              value={value}
              onChange={
                onChange
                  ? (event) => onChange(event.target.value)
                  : () => undefined
              }
            />
          );
        }
        if (editValue && options) {
          return (
            <Select
              value={value}
              onChange={(event) =>
                onChange ? onChange(event.target.value) : () => undefined
              }
            >
              {options.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          );
        }
        return <Typography>{value}</Typography>;
      })()}
    </Box>
  );
};

interface Props {
  accountDto?: AccountsDTO;
  useExtendedCard?: boolean;
  isNewAccount?: boolean;
  onInsertOrUpdateSuccess?: () => void;
}

export const AccountCard = ({
  accountDto,
  useExtendedCard = false,
  isNewAccount = false,
  onInsertOrUpdateSuccess,
}: Props) => {
  const navigate = useNavigate();
  const [writeMode, setWriteMode] = useState(false);
  const [name, setName] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (accountDto && !isNewAccount) {
      setName(accountDto.clientName || '');
    }
  }, [isNewAccount, accountDto]);

  const handleUpdate = () => {
    setIsLoading(true);
    setIsError(false);
    setError('');
    setWriteMode(false);
    updateAccount({
      accountId: `${accountDto?.id || ''}`,
      accountUpdates: {
        name,
        clientName: name,
      },
    })
      .then(() => {
        if (onInsertOrUpdateSuccess) {
          onInsertOrUpdateSuccess();
        }
        navigate(`/app/account/${accountDto?.id || ''}`);
      })
      .catch((err) => {
        setIsError(true);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSave = () => {
    setIsLoading(true);
    setIsError(false);
    setError('');
    setWriteMode(false);
    createAccount({
      accountCreate: {
        name,
        clientName: name,
      },
    })
      .then((response) => {
        if (onInsertOrUpdateSuccess) {
          onInsertOrUpdateSuccess();
        }
        console.log('response', response);
        navigate(`/app/account/${response.data.data.id}`);
      })
      .catch((err) => {
        setIsError(true);
        setError(err);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    if (isError) {
      setSnackbarOpen(true);
    }
  }, [isError]);

  const hasNoChanges = accountDto?.name === name;

  if (!accountDto && !isNewAccount) {
    return (
      <Box component="section">
        <Card sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
          <Box
            display="flex"
            flexDirection="column"
            sx={(theme) => ({
              gap: theme.spacing(1),
              padding: theme.spacing(2),
            })}
          >
            <Box display="flex">
              <Typography component="h3" sx={{ fontSize: '1.2rem' }}>
                ACCOUNT INFORMATION
              </Typography>
            </Box>
            <Box display="flex" gap="20px">
              <Skeleton height="40px" width="100px" />
              <Skeleton height="40px" width="100px" />
            </Box>
          </Box>
        </Card>
      </Box>
    );
  }

  return (
    <Box component="section">
      <Snackbar
        severity="error"
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        text={error}
      />
      <Card sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
        <Box
          display="flex"
          flexDirection="column"
          sx={(theme) => ({ gap: theme.spacing(1), padding: theme.spacing(2) })}
        >
          <Box
            display="flex"
            sx={(theme) => ({ gap: theme.spacing(10) })}
            flexBasis="100%"
          >
            <Typography component="h3" sx={{ fontSize: '1.2rem' }}>
              ACCOUNT INFORMATION
            </Typography>
            {useExtendedCard && (
              <Box
                display="flex"
                alignItems="center"
                justifyContent="center"
                sx={{ marginTop: '-4px' }}
              >
                <Typography>{writeMode ? 'To Read' : 'To Write'}</Typography>
                <Switch
                  checked={writeMode}
                  onClick={() => setWriteMode((prev) => !prev)}
                  disabled={isLoading}
                />
              </Box>
            )}
          </Box>
          <Box display="flex">
            <SmallSpace
              title="Name"
              value={name}
              editValue={writeMode}
              onChange={setName}
            />
          </Box>
          {writeMode && (
            <Box sx={(theme) => ({ marginTop: theme.spacing(2) })}>
              <SpinnerButton
                variant="contained"
                onClick={isNewAccount ? handleSave : handleUpdate}
                disabled={isLoading || hasNoChanges}
                loading={isLoading}
              >
                Save
              </SpinnerButton>
            </Box>
          )}
        </Box>
      </Card>
    </Box>
  );
};
