import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {  RouterProvider } from "react-router-dom";
import { routes } from './Router';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);


