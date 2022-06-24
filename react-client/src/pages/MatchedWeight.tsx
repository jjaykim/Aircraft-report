import React, {
  FunctionComponent,
  useEffect,
  useState,
  useContext,
  useMemo,
  useCallback,
} from 'react';
import { useQuery } from '@apollo/client';
import Box from '@material-ui/core/Box';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import map from 'lodash/map';

import {
  GET_ATCT_WEIGHT,
  MatchedAtctWeightData,
  MatchedAtctWeightVariable,
} from '../graphql/get_matched_Atct_weight.query';
import { Table } from '../components/table/Table';
import { AircraftType } from '../types/aircraft.type';
import { ATCTWeight } from '../types/filter.type';
import { TableViewerContext } from '../context/tableViewer';

/**
 * Display data with matching ATCT Weight Class name based on user input in table
 */
export const MatchedWeight: FunctionComponent = () => {
  const { viewer } = useContext(TableViewerContext);
  const [userInput, setUserInput] = useState('');

  const [matchedAtctWeight, setMatchedAtctWeight] = useState<AircraftType[]>();
  const matchedAtctWeightQuery = useQuery<
    MatchedAtctWeightData,
    MatchedAtctWeightVariable
  >(GET_ATCT_WEIGHT, {
    variables: { weight: userInput },
  });

  useEffect(() => {
    if (viewer.aircraft) {
      setMatchedAtctWeight(viewer.aircraft);
      setUserInput('All');
    }
  }, []);

  const handleClick = useCallback((item: string) => {
    setUserInput(item);
  }, []);

  useMemo(() => {
    if (userInput === 'All') {
      setMatchedAtctWeight(viewer.aircraft);
    } else if (matchedAtctWeightQuery.data) {
      setMatchedAtctWeight(matchedAtctWeightQuery.data.matchedAtctWeight);
    }
  }, [matchedAtctWeightQuery]);

  if (!matchedAtctWeight) {
    <div>Loading...</div>;
  }

  return (
    <Box>
      <Box py={4} display="flex" flexWrap="wrap" flex={1}>
        {map(ATCTWeight, (item, idx) => (
          <Box my={1} mx={1} key={`chip-${idx}`}>
            {item === userInput ? (
              <Chip
                label={item}
                color="primary"
                onDelete={() => {}}
                deleteIcon={<DoneIcon />}
              />
            ) : (
              <Chip label={item} clickable onClick={() => handleClick(item)} />
            )}
          </Box>
        ))}
      </Box>

      <Table
        TableHeader={viewer.tableHeader}
        TableFlex={viewer.tableFlex}
        rowData={matchedAtctWeight!}
        subTitle={`Successfully total ${matchedAtctWeight?.length} of models was found!`}
      />
    </Box>
  );
};
