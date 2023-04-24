import { Snackbar } from '@mind-challenge4/component-module';
import {
  EnglishLevel,
  mapEnglishLevel,
  mapRole,
  Role,
  UserDTO,
} from '@mind-challenge4/share-types';
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
import { updateUser, createUser } from '../../services/user';
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
  userDto?: UserDTO;
  useExtendedCard?: boolean;
  isNewUser?: boolean;
  onInsertOrUpdateSuccess?: () => void;
  forceRefetch?: () => void;
}

export const UserCard = ({
  userDto,
  useExtendedCard = false,
  isNewUser = false,
  onInsertOrUpdateSuccess,
  forceRefetch,
}: Props) => {
  const [writeMode, setWriteMode] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [role, setRole] = useState(Role.USER);
  const [englishLevel, setEnglishLevel] = useState(EnglishLevel.NONE);
  const [endDate, setEndDate] = useState('');
  const [startDate, setStartDate] = useState('');
  const [password, setPassword] = useState('');
  const [cvLink, setCvLink] = useState('');
  const [skills, setSkills] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState('');
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  useEffect(() => {
    if (userDto && !isNewUser) {
      setFirstName(userDto.firstName || '');
      setLastName(userDto.lastName || '');
      setEmail(userDto.email || '');
      setPhone(userDto.phone || '');
      setStartDate(userDto.startDate || '');
      setRole(mapRole(userDto.role));
      setEndDate(userDto.endDate);
      setCvLink(userDto.cvLink || '');
      setSkills(userDto.skills || '');
      setEnglishLevel(mapEnglishLevel(userDto.englishLevel));
    }
  }, [isNewUser, userDto]);

  const handleUpdate = () => {
    setIsLoading(true);
    setIsError(false);
    setError('');
    setWriteMode(false);
    updateUser({
      userId: `${userDto?.id || ''}`,
      userUpdates: {
        email,
        firstName,
        lastName,
        phone,
        role,
        englishLevel,
        skills,
        cvLink,
      },
    })
      .then(() => {
        if (onInsertOrUpdateSuccess) {
          onInsertOrUpdateSuccess();
        }
        if (forceRefetch) {
          forceRefetch();
        }
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
    if (password === '' || password.length < 8) {
      setError('Password needs to be bigger then 8 characters');
      setSnackbarOpen(true);
      return;
    }
    setIsLoading(true);
    setIsError(false);
    setError('');
    setWriteMode(false);
    createUser({
      userId: `${userDto?.id || ''}`,
      userCreate: {
        email,
        firstName,
        lastName,
        phone,
        role,
        englishLevel,
        password,
        skills,
        cvLink,
      },
    })
      .then((response) => {
        if (onInsertOrUpdateSuccess) {
          onInsertOrUpdateSuccess();
        }
        if (forceRefetch) {
          forceRefetch();
        }
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

  const hasNoChanges =
    userDto?.email === email &&
    userDto?.firstName === firstName &&
    userDto?.lastName === lastName &&
    userDto?.phone === phone &&
    userDto?.role === role &&
    userDto?.englishLevel === englishLevel &&
    userDto?.cvLink === cvLink &&
    userDto?.skills === skills;

  if (!userDto && !isNewUser) {
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
                USER INFORMATION
              </Typography>
            </Box>
            <Box display="flex" gap="20px">
              <Skeleton height="40px" width="100px" />
              <Skeleton height="40px" width="100px" />
            </Box>
            <Box display="flex" gap="20px">
              <Skeleton height="40px" width="100px" />
              <Skeleton height="40px" width="100px" />
            </Box>
            <Box display="flex" gap="20px">
              <Skeleton height="40px" width="100px" />
              <Skeleton height="40px" width="100px" />
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
              USER INFORMATION
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
              title="First Name"
              value={firstName}
              editValue={writeMode}
              onChange={setFirstName}
            />
            <SmallSpace
              title="Last Name"
              value={lastName}
              editValue={writeMode}
              onChange={setLastName}
            />
          </Box>
          <Box display="flex">
            <SmallSpace
              title="Email"
              value={email}
              editValue={writeMode}
              onChange={setEmail}
            />
            <SmallSpace
              title="Role"
              value={role}
              editValue={writeMode}
              onChange={(value) => setRole(mapRole(value))}
              options={[Role.USER, Role.ADMIN]}
            />
          </Box>
          <Box display="flex">
            <SmallSpace title="Start Date" value={startDate} />
            <SmallSpace title="End Date" value={endDate} isTime />
          </Box>
          <Box display="flex">
            <SmallSpace
              title="Phone"
              value={phone}
              editValue={writeMode}
              onChange={setPhone}
            />
            <SmallSpace
              title="English Level"
              value={englishLevel}
              editValue={writeMode}
              onChange={(value) => {
                setEnglishLevel(mapEnglishLevel(value));
              }}
              options={[
                EnglishLevel.NONE,
                EnglishLevel.INTERMEDIATE,
                EnglishLevel.BASIC,
                EnglishLevel.ADVANCED,
              ]}
            />
          </Box>
          <Box display="flex">
            <SmallSpace
              title="Cv Link"
              value={cvLink}
              editValue={writeMode}
              onChange={setCvLink}
            />
            <SmallSpace
              title="Skills"
              value={skills}
              editValue={writeMode}
              onChange={setSkills}
            />
          </Box>
          {writeMode && (
            <>
              <Box marginTop={1} display="flex">
                <SmallSpace
                  title="Password"
                  value={password}
                  editValue={writeMode}
                  onChange={setPassword}
                />
              </Box>
              <Box sx={(theme) => ({ marginTop: theme.spacing(2) })}>
                <SpinnerButton
                  variant="contained"
                  onClick={isNewUser ? handleSave : handleUpdate}
                  disabled={isLoading || hasNoChanges}
                  loading={isLoading}
                >
                  Save
                </SpinnerButton>
              </Box>
            </>
          )}
        </Box>
      </Card>
    </Box>
  );
};
