import React from 'react';
import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home"
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
export const routes = createBrowserRouter([
    {
    path: "",
    element: <App />,
    children: [
        //دا مثال ابقو اسمحوه و كملو بقي الروتس بتاعتكو و عيشوا 
        {
        path: "/",
        element: <Home />,
        },
        {
            path: "/Login",
            element: <Login />,
        },
        {
            path: "/Register",
            element: <Register />,
        },
    ],
    },
    {
    path: "*",
    element: <Navigate to={"/"} />,
    },
]);