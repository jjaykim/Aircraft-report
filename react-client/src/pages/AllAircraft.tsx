import React, { FunctionComponent, useContext } from 'react';
import Box from '@material-ui/core/Box';

import { Table } from '../components/table/Table';
import { TableViewerContext } from '../context/tableViewer';

export const AllAircraft: FunctionComponent = () => {
  const { viewer } = useContext(TableViewerContext);

  return (
    <Box pt={4}>
      <Table
        TableHeader={viewer.tableHeader}
        TableFlex={viewer.tableFlex}
        rowData={viewer.aircraft}
        subTitle={`The following is a list of ${viewer.aircraft.length} Aircraft`}
      />
    </Box>
  );
};
