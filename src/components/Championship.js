import React, { useState, useEffect, useRef } from "react";

import { Link , useNavigate } from "react-router-dom";
import zikoo from '../img/zikoo.jpg';
import "../pages/RPS-game/Round.css";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getAuthUser } from "../helper/Storage";
import axios from 'axios';
const auth = getAuthUser()
const Championship = (props) => {
  const navigate = useNavigate();
  return (
   
    
    <div className="mt-5">
       <hr />
       
          <div className=" container cards-container locked-skins-contanier">
          
          {  (
            <div className="lockedskin" >
              {
                
              }
              {/* <Link to={`/game?id=${item.id}`}> */}
              <img alt="plane1" src={props.photo} />
              <h4 className="locked-title">{props.name}</h4>
             
              {
              (props.cost <= auth.coins)&&
              <button className="d-button mb-3 mt-2 px-4 py-1" onClick={(e)=>{navigate('/game-round/'+props.id)}}>Play Now</button>
}
              
            </div>
          )}
          </div>
          </div>


  
  )
}

export default Championship;


