import React from 'react';
import { Box, Typography } from '@mui/material';

const ReportDataEmpty: React.FC = () => {
  return (
    <Box p={2}>
      <Typography variant="body2" color="secondary">
        No data to show.
      </Typography>
    </Box>
  );
};

export default ReportDataEmpty;
