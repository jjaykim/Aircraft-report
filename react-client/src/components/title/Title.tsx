import React, { FunctionComponent } from 'react';
import Box from '@material-ui/core/Box';

export const Title: FunctionComponent = () => (
  <Box pt="3rem" pb="2rem" display="flex" justifyContent="center">
    <Box className="boldText" fontSize="h4.fontSize" letterSpacing={4}>
      Aircraft 🛩
    </Box>
  </Box>
);
