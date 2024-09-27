import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import * as ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import TikBlock from "./routes/TikBlock";
import ErrorPage from './routes/ErrorPage';
import Following from './routes/Following';

const router = createBrowserRouter([
  {
    path: "/" , 
    element: <TikBlock />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/tikblock",
    element: <TikBlock />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/following",
    element: <Following/>,
    errorElement: <ErrorPage />,
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <RouterProvider router={router} />
  </StrictMode>,
)
