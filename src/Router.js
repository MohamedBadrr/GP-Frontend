/** @format */
import React from "react";
import { Navigate, createBrowserRouter } from "react-router-dom";
import App from "./App";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import User from "./pages/User/User";
import Game from "./pages/Game/Components/game-round/Game";
import SelectSkin from "./pages/Game/Components/select-skin/SelectSkin";
import RPSGameChampions from "./pages/RPS-game/RPSChampions/RPSGameChampions";
import RPSGame from "./pages/RPS-game/RPSGame";
import Mainmenu from "./pages/MainMenu/Mainmenu";
import BuySkin from "./pages/Game/Components/buy-skin/BuySkin";
import GameOver from "./pages/GameOver/GameOver";
import Winner from "./pages/winner/Winner";
import Tutorials from "./pages/Tutorials/Tutorials";
import Guset, { GuestWithoutLogin } from "./middleware/Gust";
import GamesSection from "./pages/GamesSection/GamesSection";
// import Guset from './middleware/Gust';
export const routes = createBrowserRouter([
  {
    path: "",
    element: <App />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      // Gust Login middleware
      {
          element: <Guset />,
          children: [
              {
                  path: "/Login",
                  element: <Login />,
              },
              {
                  path: "/Register",
                  element: <Register />,
              },
          ]
      },
      // Gust Without Login 
      {
          element : <GuestWithoutLogin />,
          children :[
            {
              path: "/user",
              element: <User />,
            },
            {
              path: "/game",
              element: <Game />,
            },
            {
              path: "/selectskin",
              element: <SelectSkin />,
            },
            {
              path: "/tutorial",
              element: <Tutorials />,
            },
            {
              path: "/buyskin",
              element: <BuySkin />,
            },
            {
              path: "/aboutus",
              element: <AboutUs />,
            },
            {
              path: "/gamessection",
              element: <GamesSection />,
            },
            {
              path: "/RPS-Game",
              element: <RPSGameChampions />,
            },
            {
              path: "/game-round/:id",
              element: <RPSGame />,
            },
            {
              path: "/mainamenu",
              element: <Mainmenu />,
            },
            {
              path: "/gameover",
              element: <GameOver playagin="selectskin" />,
            },
            {
              path: "/gameoverRPS",
              element: <GameOver playagin="RPS-Game" />,
            },
            {
              path: "/winner",
              element: (
                <Winner
                  playagin="selectskin"
                  linkSecondChoice="mainamenu"
                  secondChoice="Back To Main Menu?"
                />
              ),
            },
            {
              path: "/winnerRPS",
              element: (
                <Winner
                  playagin="RPS-Game"
                  linkSecondChoice="home"
                  secondChoice="Back To Home?"
                />
              ),
            },
          ]
      },
    ],
  },
  {
    path: "*",
    element: <Navigate to={"/home"} />,
  },
]);
