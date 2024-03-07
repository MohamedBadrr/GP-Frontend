
import React, { useState, useEffect, useRef } from "react";

import { Link , useNavigate } from "react-router-dom";
import zikoo from '../img/zikoo.jpg';

import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
const Championship = (props) => {
   
  const navigate = useNavigate();
  return (
    <div><div>
    {/* 
    <button onClick={()=>{navigate('/game-round/50')}} style={{marginBottom: '10px'}}>Start Championship 1 (Costs 50 coins)</button>
    <button onClick={()=>{navigate('/game-round/100')}} style={{marginBottom: '10px'}}>Start Championship 2 (Costs 200 coins)</button>
    <button onClick={()=>{navigate('/game-round/300')}} style={{marginBottom: '10px'}}>Start Championship 3 (Costs 400 coins)</button>
     */}
   
    <Card style={{ width: '18rem' }}>
<Card.Img variant="top" src={props.photo} />
<Card.Body>
  <Card.Title>{props.name}</Card.Title>
  
  <Button variant="primary"onClick={()=>{navigate('/game-round/50')}}>Start Championship 1(Costs {props.cost})</Button>
</Card.Body>
</Card>

<p className="" style={{ color: "black" }}>Championships Remaining: {props.gameremaining}</p>
  </div></div>
  )
}

export default Championship