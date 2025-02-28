import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { AppProvider } from './context/AppContext';
import { SnackbarProvider } from 'notistack';

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  <AppProvider>
    <SnackbarProvider maxSnack={3}
      anchorOrigin={{
        vertical: "top",
        horizontal: "left",
      }}>
      <App />
    </SnackbarProvider>
  </AppProvider>
</React.StrictMode>
)
