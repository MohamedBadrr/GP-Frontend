import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/select-skin.css" ;
import { getAuthUser } from '../../../helper/Storage';
import axios from 'axios';


export default function SelectSkin() {
  const auth = getAuthUser();
  
    const [ skins , setSkins ] = useState({
      loading : false ,
      data : [],
      errors: null,
    })
    useEffect(() => {
      setSkins({...skins , loading:true , err:[]});
        axios.get("http://localhost:4000/skins/unlocked",
        {
          headers:{
          token : auth.token,
          }
        }).then((resp) =>{
          setSkins({...skins, data : resp.data , loading:false , errors:""})

        }).catch((errors)=>{
            console.log(errors);
            setSkins({...skins , loading:false , errors:errors.response.data.errors[0].msg})
        });
    }, [])
  return (
    <section className="skin-section">
      <h1>Select Your skin</h1>
      <div className="cards-container">
        {
          skins.data.map((item)=>{
            return (
              <div className="skin-card">
                <Link to={`/game?id=${item.id}`}>
                  <h4>{item.name}</h4>
                  <img alt="plane1" src={item.imageUrl} />
                </Link>
              </div>
            )
          })
        }
        
        {/* <div className="skin-card">
          <Link to={"/game?id=1"}>
            <h4>Ghost</h4>
            <img alt="plane1" src={plane2} />
          </Link>
        </div>
        <div className="skin-card">
          <Link to={"/game?id=2"}>
            <h4>Retro</h4>
            <img alt="plane1" src={plane5} />
          </Link>
        </div> */}
      </div>
    </section>
  );
}
