import React from 'react';
import ReactDOM from 'react-dom';
import Skeleton from './Skeleton';
import Form from './Form';

import ThemeProvider from '@mui/material/styles/ThemeProvider';
import createTheme from '@mui/material/styles/createTheme';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Skeleton>
        <Form />
      </Skeleton>
    </ThemeProvider>
  );
}

ReactDOM.render(<App />, document.getElementById('root'));
