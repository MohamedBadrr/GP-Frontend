
import React from 'react';
import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from './pages/home/Home';
import User from './pages/User/User';


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
        
    ],
    },
    {
    path: "*",
    element: <Navigate to={"/"} />,
    },
]);