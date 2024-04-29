import React, { useState, useEffect, useRef } from "react";
import { Link , useNavigate } from "react-router-dom";
import Championship from "../component/Championship";
import "./RPSGameChampions.css";
import axios from 'axios';
import { getAuthUser } from "../../../helper/Storage";


const RPSGameChampions = () => {
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
      <p className="platWithAi">play with AI !!!!!</p>
        <div className="cardsArea">
          
          {
            champdata.data.map((item)=>(<Championship id={item.id} userConis={auth.coins} name={item.name}  photo={item.image} cost={item.price} gameremaining={item.game_remaining}/>))
            
          }
          
        </div>
        
    </div>
    
  );
};

export default RPSGameChampions;
