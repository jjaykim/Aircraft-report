import React, { FunctionComponent, useEffect, useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import Box from '@material-ui/core/Box';

import { createAppTheme } from './styles/them';
import { Home } from './pages/Home';
import { TableViewer } from './types/table_viewer.type';
import { GET_AIRCRAFT } from './graphql/get_all_Aircraft.query';
import { TableFlex, TableHeaderType } from './types/tableHeader.type';
import { TableViewerContext } from './context/tableViewer';
import { NotFound } from './components/not_found/NotFound';

const App: FunctionComponent = () => {
  const theme = createAppTheme();
  const [viewer, setViewer] = useState<TableViewer>();

  const { loading, data } = useQuery(GET_AIRCRAFT);

  useEffect(() => {
    if (!loading && data) {
      setViewer({
        aircraft: data.allAircraft,
        tableHeader: TableHeaderType,
        tableFlex: TableFlex,
      });
    }
  }, [loading, data]);

  if (loading || !viewer) return <div>loading...</div>;

  return (
    <TableViewerContext.Provider value={{ viewer, setViewer }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Box position="relative" minHeight="100vh" mx="14rem">
          <BrowserRouter>
            <Switch>
              <Route exact path="/">
                <Home />
              </Route>
              <Route component={NotFound} path="*" />
            </Switch>
          </BrowserRouter>
        </Box>
      </ThemeProvider>
    </TableViewerContext.Provider>
  );
};

export default App;
