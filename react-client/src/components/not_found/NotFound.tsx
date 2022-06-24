import React, { FunctionComponent } from 'react';
import { Link as RouteLink } from 'react-router-dom';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';

export const NotFound: FunctionComponent = () => (
  <Box display="flex" justifyContent="center" flexDirection="column">
    <Box display="flex" justifyContent="center" pt={20} component="h1">
      Not Fount 404
    </Box>

    <Box display="flex" justifyContent="center">
      <Button
        className="routerLink"
        component={RouteLink}
        to="/"
        variant="contained"
      >
        Go to Home
      </Button>
    </Box>
  </Box>
);
