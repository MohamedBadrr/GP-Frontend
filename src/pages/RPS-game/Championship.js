import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
// import zikoo from '../img/zikoo.jpg';
import "./RPSGame.css";
// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
// import { getAuthUser } from "../helper/Storage";
// import axios from 'axios';



const Championship = (props) => {
  const navigate = useNavigate();
  // const auth = getAuthUser();
  const [showBuyAlert, setShowBuyAlert] = useState({});


  const handleLockClick = (itemId) => {
    setShowBuyAlert({ ...showBuyAlert, [itemId]: true }); // Set alert for specific item ID
    // Optionally, reset showBuyAlert after a brief delay
    setTimeout(() => setShowBuyAlert({ ...showBuyAlert, [itemId]: false }), 2000); // Adjust timeout as needed
};



return (
<div class="box-container">
  <div class="box-item">
      <div class="flip-box">
        <div class="flip-box-front text-center" style={{ }}>
            <div class="inner color-white">
            </div>
  </div>
 
  {props.userConis < props.cost?
    <button className="d-button mb-3 mt-2 px-4 py-1" onClick={(e)=>{handleLockClick(props.id);}}>
    <div class="flip-box-back text-center" style={{backgroundImage:`url(${props.photo})`}}>
          {showBuyAlert[props.id] && ( // Check for alert based on item ID
                <div className="alert alert-danger p-1 mx-2 my-2">You Don't Have Enough Coins
          </div>)}
      <div class="inner color-white">
        <h3 class="flip-box-header">{props.name}</h3>
        <h3 class="flip-box-header">{`Cost : ${props.cost}`}</h3>
        {props.userConis < props.cost?
        <i
        className="fa-solid fa-lock lock-icon-skin lockChampion"
          onClick={()=>{console.log("locked");}}></i>
        :
      <></>
}
    </div>
  </div></button>
  :    
  <button className="d-button mb-3 mt-2 px-4 py-1" onClick={(e)=>{navigate('/game-round/'+props.id)}}>
  <div class="flip-box-back text-center" style={{backgroundImage:`url(${props.photo})`}}>
    <div class="inner color-white">
      <h3 class="flip-box-header">{props.name}</h3>
      <h3 class="flip-box-header">{`Cost : ${props.cost}`}</h3>
      {props.userConis < props.cost?
      <i
      className="fa-solid fa-lock lock-icon-skin lockChampion"
        onClick={()=>{console.log("locked");}}></i>
      :
    <></>
}
  </div>
</div></button>}
   
</div>
</div>
</div>
  )
}

export default Championship;


