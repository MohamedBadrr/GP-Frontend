import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "../../utilities";
import rock from "../../images_Ai/rock.png";
import paper from "../../images_Ai/paper.png";
import scissor from "../../images_Ai/scissors.png";
import { Link , useNavigate } from "react-router-dom";
import Round from "./Round";

const RPSGame = () => {
  const [coins, setCoins] = useState(500);
  const navigate = useNavigate();



  return (
    <div>
        <div>
          <p className="" style={{ color: "black" }}>You have {coins} coins</p>
          <button onClick={()=>{navigate('/game-round/50')}} style={{marginBottom: '10px'}}>Start Championship 1 (Costs 50 coins)</button>
          <button onClick={()=>{navigate('/game-round/100')}} style={{marginBottom: '10px'}}>Start Championship 2 (Costs 200 coins)</button>
          <button onClick={()=>{navigate('/game-round/300')}} style={{marginBottom: '10px'}}>Start Championship 3 (Costs 400 coins)</button>
          <p className="" style={{ color: "black" }}>Championships Remaining: 5</p>
        </div>
    </div>
  );
};

export default RPSGame;
