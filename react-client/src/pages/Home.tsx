import React, { FunctionComponent, useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { withTheme } from '@material-ui/core';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import map from 'lodash/map';
import styled from 'styled-components';

import { FilterSelect } from '../components/filter_select/FilterSelect';

import { AllAircraft } from './AllAircraft';
import { MatchedModels } from './MatchedModels';
import { MatchedWeight } from './MatchedWeight';

interface HomeProps {
  className?: string;
}

/**
 * Main Home page displays tables based on the selected filter value
 */
const UnstyledHome: FunctionComponent<HomeProps> = ({ className }) => {
  const [filter, setFilter] = useState('All Data');

  return (
    <Box className={className}>
      <FilterSelect
        filter={filter}
        onChange={(filter: string) => {
          setFilter(filter);
        }}
      />
      {filter === 'All Data' && <AllAircraft />}
      {filter === 'Model' && <MatchedModels />}
      {filter === 'ATCT Weight Class' && <MatchedWeight />}
    </Box>
  );
};

export const Home = withTheme(styled(UnstyledHome)``);
