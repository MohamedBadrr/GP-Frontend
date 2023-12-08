import React from 'react';
import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from './pages/Register/Register';
export const routes = createBrowserRouter([
    {
    path: "",
    element: <App />,
    children: [
        //دا مثال ابقو اسمحوه و كملو بقي الروتس بتاعتكو و عيشوا 
        {
        path: "/",
        element: <Home/>,
        },
        {

        path: "/user",
        element: <User/>,
        },
        
        {
            path: "/Login",
            element: <Login />,
        },
        {
            path: "/Register",
            element: <Register />,
        },
        {
            path: "/game",
            element: <Game />,
        },
        {
            path: "/selectskin",
            element: <SelectSkin />,
        },

    ],
    },
    {
    path: "*",
    element: <Navigate to={"/"} />,
    },
]);