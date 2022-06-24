import React, {
  FunctionComponent,
  useState,
  ChangeEvent,
  useMemo,
  useContext,
  useEffect,
} from 'react';
import { useQuery } from '@apollo/client';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Search from '@material-ui/icons/Search';
import debounce from 'lodash/debounce';

import {
  GET_MATCHEDMODELS,
  MatchedModelsData,
  MatchedModelsVariable,
} from '../graphql/get_matched_Models.query';
import { Table } from '../components/table/Table';
import { AircraftType } from '../types/aircraft.type';
import { TableViewerContext } from '../context/tableViewer';

/**
 * Display data with matching model name based on user input in table
 */
export const MatchedModels: FunctionComponent = () => {
  const { viewer } = useContext(TableViewerContext);
  const [userInput, setUserInput] = useState('');

  const [matchedModels, setMatchedModels] = useState<AircraftType[]>();
  const matchedModelsQuery = useQuery<MatchedModelsData, MatchedModelsVariable>(
    GET_MATCHEDMODELS,
    {
      variables: { input: userInput },
    }
  );

  useEffect(() => {
    if (viewer.aircraft) {
      setMatchedModels(viewer.aircraft);
    }
  }, []);

  const serachingModel = debounce((value: string) => {
    setUserInput(value);
  }, 300);

  useMemo(() => {
    if (userInput.length > 0 && matchedModelsQuery.data) {
      setMatchedModels(matchedModelsQuery.data.matchedModels);
    } else if (userInput.length === 0) {
      setMatchedModels(viewer.aircraft);
    }
  }, [matchedModelsQuery]);

  if (!matchedModels) {
    <div>Loading...</div>;
  }

  return (
    <Box>
      <Box py={4}>
        <TextField
          fullWidth
          id="input-with-icon-textfield"
          label="Find your model"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={(evt: ChangeEvent<{ value: unknown }>) => {
            serachingModel(evt.target.value as string);
          }}
        />
      </Box>

      <Table
        TableHeader={viewer.tableHeader}
        TableFlex={viewer.tableFlex}
        rowData={matchedModels!}
        subTitle={`Successfully total ${matchedModels?.length} of models was found!`}
      />
    </Box>
  );
};
