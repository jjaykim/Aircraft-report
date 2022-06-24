import { createContext } from 'react';

import { TableViewer } from '../types/table_viewer.type';

export interface TableViewerContextType {
  viewer: TableViewer;
  setViewer: (table: TableViewer) => void;
}

export const TableViewerContext = createContext<TableViewerContextType>({
  // Initial values - will get overwritten from data fetch
  viewer: {
    aircraft: [],
    tableHeader: [],
    tableFlex: [],
  },
  setViewer: () => undefined,
});
