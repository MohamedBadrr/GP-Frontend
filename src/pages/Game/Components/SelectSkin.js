import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import Game, { CarShow } from './Game';
export default function SelectSkin() {
    const skin2="models/plane5/skin5.glb";
    const selectSkin2=(skin2)=>{
        console.log("done");
        return(
            <>
            <CarShow skin={skin2}/>
            <Navigate to={"/game"}/>
            
            </>)
        
    }
  return (
    <div>
      <h1>Select  Your skin</h1>
      <h4>Skin1</h4><button className='btn btn-info me-5' onClick={selectSkin2}>play with skin1</button>
      <button className='btn btn-info'><Link to={"/game"}>Play normal</Link></button>
    </div>
  );
}
