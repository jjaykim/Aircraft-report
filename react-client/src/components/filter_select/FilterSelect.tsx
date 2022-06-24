/* eslint-disable no-void */
import React, { FunctionComponent, ChangeEvent } from 'react';
import withTheme from '@material-ui/core/styles/withTheme';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import map from 'lodash/map';

import { SelectionType } from '../../types/filter.type';

interface FilterProps {
  className?: string;
  filter: string;
  onChange: (filter: string) => Promise<void>;
}

const UnstyledFilterSelect: FunctionComponent<FilterProps> = ({
  className,
  filter,
  onChange,
}) => (
  <Box className={className}>
    <FormControl className="filter-form">
      <InputLabel id="select-label">Filter</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={filter}
        onChange={(evt: ChangeEvent<{ value: unknown }>) => {
          void onChange(evt.target.value as string);
        }}
      >
        {map(SelectionType, (value, idx) => (
          <MenuItem value={value} key={`item-${idx}`}>
            {value}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>Select what you want</FormHelperText>
    </FormControl>
  </Box>
);

export const FilterSelect = withTheme(styled(UnstyledFilterSelect)`
  .filter-form {
    min-width: 170px;
  }

  .MuiSelect-select.MuiSelect-select {
    background-color: transparent;
  }
`);
