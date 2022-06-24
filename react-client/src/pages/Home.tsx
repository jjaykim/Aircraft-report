import React, { FunctionComponent, useState } from 'react';
import Box from '@material-ui/core/Box';

import { FilterSelect } from '../components/filter_select/FilterSelect';
import { Title } from '../components/title/Title';

import { AllAircraft } from './AllAircraft';
import { MatchedModels } from './MatchedModels';
import { MatchedWeight } from './MatchedWeight';

interface HomeProps {
  className?: string;
}

/**
 * Main Home page displays tables based on the selected filter value
 */
export const Home: FunctionComponent<HomeProps> = ({ className }) => {
  const [filter, setFilter] = useState('All Data');

  return (
    <Box className={className}>
      <Title />

      <FilterSelect
        filter={filter}
        onChange={(input: string) => {
          setFilter(input);
        }}
      />
      {filter === 'All Data' && <AllAircraft />}
      {filter === 'Model' && <MatchedModels />}
      {filter === 'ATCT Weight Class' && <MatchedWeight />}
    </Box>
  );
};
