import React, { useState, useEffect, useRef } from "react";
import { Link , useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Championship from "../../components/Championship";
import "./Round.css";
import { getAuthUser } from '../../helper/Storage';
import axios from 'axios';
const RPSGame = () => {
  const auth = getAuthUser();
  const headers = {
    token : auth.token,
    }
  const [coins, setCoins] = useState({
    loading : false,
    data : null ,
    err : []
  });
  const navigate = useNavigate();
const [ champdata , setChampdata ] = useState({
  loading : false,
  data : [],
  err : []
})
useEffect(() => {
  setChampdata({...champdata , loading:true , err:[]});
    axios.get("http://localhost:4000/RPS-game/allChamps",
    {
      headers: headers
    }).then((resp) =>{
      setChampdata({...champdata, data : resp.data , loading:false , err:""})

    }).catch((errors)=>{
        console.log(errors);
        setChampdata({...champdata , loading:false , err:errors.response.data.errors[0].msg})
    });
}, [])

 return (
    <div className="all" >
      <p className="yourcoins1" style={{ color: "white" }}>You have {coins} coins</p>
      <p className="yourcoins" style={{ color: "white" }}>choose who you can play with him </p>
        <div className="cards-container">
          
          {
            champdata.data.map((item)=>(<Championship name={item.name}  photo={item.image} cost={item.price} gameremaining={item.game_remaining}/>))
          }
        </div>
    </div>
  );
};

export default RPSGame;
