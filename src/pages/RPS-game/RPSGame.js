import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "../../utilities";
import rock from "../../images_Ai/rock.png";
import paper from "../../images_Ai/paper.png";
import scissor from "../../images_Ai/scissors.png";
import { Link , useNavigate } from "react-router-dom";
import zikoo from '../../img/zikoo.jpg';
import badr from '../../img/badr.jpg';
import zizo from '../../img/zizo.jpg';
import Round from "./Round";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Championship from "../../components/Championship";
import "./Round.css";
const RPSGame = () => {
  const [coins, setCoins] = useState(100);
  const navigate = useNavigate();
const data =[{
  name: "zikoo"  ,
  photo: zikoo ,
  cost: 50 ,
  gameremaining: 3 ,

},{
  name: "zizo"  ,
  photo: zizo ,
  cost: 200 ,
  gameremaining: 5 ,
},{
  name: "badr"  ,
  photo: badr ,
  cost: 400 ,
  gameremaining: 7 ,
}]
  return (
    <div className="all" >
      <p className="yourcoins1" style={{ color: "white" }}>You have {coins} coins</p>
      <p className="yourcoins" style={{ color: "white" }}>choose who you can play with him </p>
        <div className="cards-container">
          
          {
            data.map((item)=>(<Championship name={item.name}  photo={item.photo} cost={item.cost} gameremaining={item.gameremaining}/>))
          }
        </div>
    </div>
  );
};

export default RPSGame;
