
import React, { useState, useEffect, useRef } from "react";

import { Link , useNavigate } from "react-router-dom";
import zikoo from '../img/zikoo.jpg';
import "../pages/RPS-game/Round.css";

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { getAuthUser } from "../helper/Storage";
const auth = getAuthUser()
const Championship = (props) => {
  const navigate = useNavigate();
  return (
    <div><div>
    {/* 
    <button onClick={()=>{navigate('/game-round/50')}} style={{marginBottom: '10px'}}>Start Championship 1 (Costs 50 coins)</button>
    <button onClick={()=>{navigate('/game-round/100')}} style={{marginBottom: '10px'}}>Start Championship 2 (Costs 200 coins)</button>
    <button onClick={()=>{navigate('/game-round/300')}} style={{marginBottom: '10px'}}>Start Championship 3 (Costs 400 coins)</button>
     */}
    <Card style={{ width: '18rem', margin:'10px' }}>
<Card.Img variant="top" sizes="" src={props.photo} />
<Card.Body>
  <Card.Title>{props.name} Costs {props.cost}</Card.Title>
  {
    ( props.cost <= auth.coins ) &&   <Button className="championbutton" variant="primary"onClick={()=>{navigate('/game-round/'+props.id)}}>Start Championship</Button>
  }
</Card.Body>
</Card>


  </div></div>
  )
}

export default Championship