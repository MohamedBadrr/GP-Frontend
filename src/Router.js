import React from 'react';
import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home"
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Game from './pages/Game/Components/Game';
import SelectSkin from './pages/Game/Components/SelectSkin';
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