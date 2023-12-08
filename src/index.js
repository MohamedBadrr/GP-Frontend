import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import {  RouterProvider } from "react-router-dom";
import { routes } from './Router';
<<<<<<< HEAD
import 'bootstrap/dist/css/bootstrap.min.css';
=======
import "bootstrap/dist/css/bootstrap.min.css";

>>>>>>> 2d360b98abe3b6146c00c489224c5fb9d871b1a3

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={routes} />
  </React.StrictMode>
);


