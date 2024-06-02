import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App/App';
import {setupStore} from './store/store';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@emotion/react';
import { createTheme } from '@mui/material/styles';
import { css, Global } from '@emotion/react';

import { QueryClient, QueryClientProvider } from 'react-query';
const queryClient = new QueryClient();

const store = setupStore();

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#ffffff',
      contrastText: '#ffffff',
    },
  },
});

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={darkTheme}>
      <App />
      </ThemeProvider>
    </QueryClientProvider>
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
