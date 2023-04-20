import { UserDTO } from '@mind-challenge4/share-types';
import { Box, Card, Typography } from '@mui/material';
import React from 'react';

const SmallSpace = ({ title, value }: { title: string; value: string }) => {
  return (
    <Box
      display="flex"
      sx={(theme) => ({ gap: theme.spacing(1) })}
      flexBasis="50%"
    >
      <Typography>{title}:</Typography>
      <Typography>{value}</Typography>
    </Box>
  );
};

interface Props {
  userDto: UserDTO;
}

export const UserCard = ({ userDto }: Props) => {
  console.log(userDto);
  return (
    <Box component="section">
      <Card sx={{ boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px' }}>
        <Box
          display="flex"
          flexDirection="column"
          sx={(theme) => ({ gap: theme.spacing(1), padding: theme.spacing(2) })}
        >
          <Box display="flex">
            <Typography component="h3" sx={{ fontSize: '1.2rem' }}>
              USER INFORMATION
            </Typography>
          </Box>
          <Box display="flex">
            <SmallSpace title="First Name" value={userDto.firstName} />
            <SmallSpace title="Last Name" value={userDto.lastName} />
          </Box>
          <Box display="flex">
            <SmallSpace title="Email" value={userDto.email} />
            <SmallSpace title="Role" value={userDto.role} />
          </Box>
          <Box display="flex">
            <SmallSpace title="Start Date" value={userDto.startDate} />
            <SmallSpace title="End Date" value={userDto.endDate} />
          </Box>
          <Box display="flex">
            <SmallSpace title="Phone" value={userDto.phone} />
            <SmallSpace title="English Level" value={userDto.englishLevel} />
          </Box>
        </Box>
      </Card>
    </Box>
  );
};
