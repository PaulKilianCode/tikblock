import React from 'react';
import { createRoot } from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { WalletsProvider } from  './components/WalletsContext';
import TikBlock from './routes/TikBlock';
import ErrorPage from './routes/ErrorPage';
import Following from './routes/Following';
import './index.css'; // Importiere die Tailwind CSS-Datei

const router = createBrowserRouter([
  {
    path: '/',
    element: <TikBlock />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/tikblock',
    element: <TikBlock />,
    errorElement: <ErrorPage />,
  },
  {
    path: '/following',
    element: <Following />,
    errorElement: <ErrorPage />,
  },
]);

const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <WalletsProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    </WalletsProvider>
  </React.StrictMode>
);
