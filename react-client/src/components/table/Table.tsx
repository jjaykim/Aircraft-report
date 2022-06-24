import React, { FunctionComponent, useEffect, useMemo, useState } from 'react';
import { withTheme } from '@material-ui/core';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import Divider from '@material-ui/core/Divider';
import orderBy from 'lodash/orderBy';
import map from 'lodash/map';

import { AircraftType } from '../../types/aircraft.type';
import { TableHeaderData } from '../../types/tableHeader.type';
import { Pagination } from '../pagination/Pagination';

interface TableProps {
  TableHeader: string[];
  TableFlex: number[];
  rowData: AircraftType[];
  subTitle: string;
  className?: string;
}

const UnstyledTable: FunctionComponent<TableProps> = ({
  TableHeader,
  TableFlex,
  rowData,
  subTitle,
  className,
}) => {
  const [order, setOrder] = useState<'desc' | 'asc'>('desc');
  const [selectColumn, setSelectColumn] = useState('');
  const [column, setColumn] = useState(TableHeaderData);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(15);

  const newOrder: AircraftType[] = useMemo(() => {
    const data = { ...rowData };

    return orderBy(data, [selectColumn], [order]);
  }, [rowData, selectColumn, order]);

  const handlePageChange = (pageNum: number) => {
    setPage(pageNum);
  };

  return (
    <Box className={className}>
      <Box pl="1rem" pb="1.4rem" color="#becdda" fontSize="1rem">
        {subTitle}
      </Box>

      <Paper elevation={3}>
        {/* table header */}
        <Box
          className="table-header"
          display="flex"
          justifyContent="space-around"
          py={0.8}
          px={1}
        >
          {map(TableHeader, (headerText, idx) => (
            <Box
              className="table-header-row"
              key={`${idx}-table-row`}
              flex={TableFlex[idx]}
              display="flex"
              justifyContent="center"
              alignItems="center"
              onClick={() => {
                setOrder(order === 'desc' ? 'asc' : 'desc');
                setSelectColumn(column[idx]);
              }}
            >
              {headerText}
            </Box>
          ))}
        </Box>
        {/* row data */}
        {map(
          newOrder.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage),
          (data, dataRowIdx) => {
            let columnIdx = 0;

            return (
              <>
                <Box
                  key={`table-${dataRowIdx}`}
                  className="table-data-row"
                  py={1.3}
                >
                  <Box
                    display="flex"
                    justifyContent="space-around"
                    alignItems="center"
                    py={0.8}
                  >
                    <Box
                      key={`No-${dataRowIdx}`}
                      flex={TableFlex[columnIdx++]}
                      display="flex"
                      justifyContent="center"
                    >
                      {page === 0
                        ? dataRowIdx + 1
                        : dataRowIdx + 1 + rowsPerPage * page}
                    </Box>

                    {map(data, (property, idx) => (
                      <Box
                        key={idx}
                        flex={TableFlex[columnIdx++]}
                        display="flex"
                        justifyContent="center"
                      >
                        {property}
                      </Box>
                    ))}
                  </Box>
                </Box>
                <Divider variant="middle" />
              </>
            );
          }
        )}
      </Paper>

      <Pagination
        className="pagination"
        activePage={page}
        rowsPerPage={rowsPerPage}
        totalLength={rowData ? rowData.length : 0}
        onChange={(pageNum: number) => {
          handlePageChange(pageNum);
        }}
      />
    </Box>
  );
};

export const Table = withTheme(styled(UnstyledTable)`
  .table-header {
    font-size: 0.75rem;
    background-color: #5a505099;
    font-weight: bold;
    cursor: pointer;
  }

  .table-data-row {
    &:hover {
      filter: grayscale(0.8);
      background-color: #e5eec1;
    }
  }

  .pagination {
    margin-top: 40px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
  }
`);
