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
import axios from 'axios';
import { getAuthUser } from "../../helper/Storage";
import { StrictMode } from "react";
import Plxx from "../../components/Plxx";

const RPSGame = () => {
  const auth = getAuthUser();
  
  const navigate = useNavigate();
  const [ champdata , setChampdata ] = useState({
    loading : false,
    data : [],
    err : []
  })
  useEffect(() => {
    if (auth) {
      setChampdata({...champdata , loading:true , err:[]});
      axios.get("http://localhost:4000/RPS-game/allChamps",
      {
        headers:{
          token : auth.token
        }
      }).then((resp) =>{
        setChampdata({...champdata, data : resp.data , loading:false , err:""})
  
      }).catch((errors)=>{
          console.log(errors);
          setChampdata({...champdata , loading:false , err:errors.response.data.errors[0].msg})
      });
    }
  }, [])
  return (
    <div className="all" >
      <p className="yourcoins1" style={{ color: "white" }}>play with AI !!!!!</p>
        <div className="cards-container">
          
          {
            champdata.data.map((item)=>(<Championship id={item.id} name={item.name}  photo={item.image} cost={item.price} gameremaining={item.game_remaining}/>))
            
          }
          
        </div>
        
    </div>
    
  );
};

export default RPSGame;
