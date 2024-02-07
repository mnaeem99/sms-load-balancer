import * as React from 'react';
import { Box, CircularProgress } from '@material-ui/core';

const LoadingSpinner = () => {
  return (
    <Box sx={{
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: 'absolute',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <CircularProgress color="success"/>
    </Box>
  );
}
export default LoadingSpinner;