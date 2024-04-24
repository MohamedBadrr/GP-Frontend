import React from 'react';
import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from './pages/Register/Register';
import User from './pages/User/User';
import Game from './pages/Game/Components/Game';
import SelectSkin from './pages/Game/Components/SelectSkin';
import RPSGame from './pages/RPS-game/RPSGame';
import Round from './pages/RPS-game/Round';
import Mainmenu from './pages/MainMenu/Mainmenu';
import BuySkin from './pages/Game/Components/BuySkin';
import GameOver from './pages/GameOver/GameOver';
import Winner from './pages/winner/Winner';
import Card from './pages/Home/Card';
// import Guset from './middleware/Gust';
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
            path: "/home",
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
        // Gust middleware
        // {
        //     element: <Guset />,
        //     children: [
        //         {
        //             path: "/Login",
        //             element: <Login />,
        //         },
        //         {
        //             path: "/Register",
        //             element: <Register />,
        //         },
        //     ]
        // },
        {
            path: "/game",
            element: <Game />,
        },
        {
            path: "/selectskin",
            element: <SelectSkin />,
        },
        {
            path: "/buyskin",
            element: <BuySkin />,
        },
        {
            path: "/RPS-Game",
            element: <RPSGame />,
        },
        {
            path : "/game-round/:id",
            element : <Round />
        },
        {
            path : "/card",
            element : <Card />
        },
        {
            path : "/mainamenu",
            element : <Mainmenu />
        },
        {
            path : "/gameover",
            element : <GameOver />
        },
        {
            path : "/winner",
            element : <Winner />
        },
    ],
    },
    {
    path: "*",
    element: <Navigate to={"/"} />,
    },
]);