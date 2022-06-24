import React, { FunctionComponent, useState, useEffect } from 'react';
import { withTheme } from '@material-ui/core';
import styled from 'styled-components';
import Box from '@material-ui/core/Box';
import ArrowBackIos from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIos from '@material-ui/icons/ArrowForwardIos';

interface PaginationProps {
  className?: string;
  totalLength: number;
  onChange: (pageNum: number) => Promise<void>;
  activePage: number;
  rowsPerPage: number;
}

const UnstyledPagination: FunctionComponent<PaginationProps> = ({
  className,
  totalLength,
  onChange,
  activePage,
  rowsPerPage,
}) => {
  const [lastPage, SetLastPage] = useState(0);

  useEffect(() => {
    if (activePage > -1 && totalLength > 0) {
      SetLastPage(
        totalLength % rowsPerPage === 0
          ? totalLength / rowsPerPage
          : Math.ceil(totalLength / rowsPerPage)
      );
    } else {
      SetLastPage(1);
    }
  }, [totalLength]);

  const prevPageChange = () => {
    if (activePage > 0) {
      onChange(activePage - 1);
    }
  };

  const nextPageChange = () => {
    if (activePage < lastPage - 1) {
      onChange(activePage + 1);
    }
  };

  return (
    <Box
      className={className}
      display="flex"
      flexDirection="row"
      flexWrap="wrap"
      justifyContent="center"
      alignItems="center"
      pb={4}
    >
      <Box
        className={activePage !== 0 ? 'first-page' : 'non-cursor'}
        onClick={() => {
          onChange(0);
        }}
      >
        <ArrowBackIos />
        <ArrowBackIos className="first-page-button" />
      </Box>

      <Box
        className={activePage !== 0 ? 'prev-page' : 'non-cursor'}
        onClick={prevPageChange}
        ml={3}
      >
        <ArrowBackIos />
      </Box>

      <Box margin="0 3rem 0 3rem" pb="0.3rem">
        {activePage + 1} of {lastPage}
      </Box>

      <Box
        className={activePage + 1 !== lastPage ? 'next-page' : 'non-cursor'}
        onClick={nextPageChange}
        mr={3}
      >
        <ArrowForwardIos />
      </Box>

      <Box
        className={activePage + 1 !== lastPage ? 'last-page' : 'non-cursor'}
        onClick={() => {
          onChange(lastPage - 1);
        }}
      >
        <ArrowForwardIos className="last-page-button" />
        <ArrowForwardIos />
      </Box>
    </Box>
  );
};

export const Pagination = withTheme(styled(UnstyledPagination)`
  .non-cursor {
    cursor: default;
    opacity: 0.3;
  }

  .first-page {
    cursor: pointer;
    opacity: 0.7;

    &:hover {
      color: #f9d423;
    }
  }

  .first-page-button {
    margin-left: -1.3rem;
  }

  .prev-page {
    cursor: pointer;

    &:hover {
      color: #f9d423;
    }
  }

  .page-number {
    margin: 0 3rem 0 3rem;
    padding-bottom: 0.3rem;
  }

  .next-page {
    cursor: pointer;

    &:hover {
      color: #f9d423;
    }
  }

  .last-page {
    cursor: pointer;
    opacity: 0.7;

    &:hover {
      color: #f9d423;
    }
  }

  .last-page-button {
    margin-right: -1.3rem;
  }

  .MuiSvgIcon-root {
    font-size: 2rem;
  }
`);
