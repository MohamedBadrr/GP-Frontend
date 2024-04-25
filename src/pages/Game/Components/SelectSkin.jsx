import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./css/select-skin.css" ;
import { getAuthUser , updateAuthUser } from '../../../helper/Storage';
import axios from 'axios';
import Plxx from "../../../components/Plxx";
export default function SelectSkin() {
  const [showBuyAlert, setShowBuyAlert] = useState({});
  const auth = getAuthUser();
    const [ skins , setSkins ] = useState({
      loading : false ,
      data : [],
      errors: null,
    })
    useEffect(() => {
      if (auth) {
        setSkins({...skins , loading:true , err:[]});
        axios.get("http://localhost:4000/skins/unlocked",
        {
          headers:{
            token : auth.token
          }
        }).then((resp) =>{
          setSkins({...skins, data : resp.data , loading:false , errors:""})
          updateAuthUser(auth.token)
        }).catch((errors)=>{
            console.log(errors);
            setSkins({...skins , loading:false , errors:errors.response.data.errors[0].msg})
        });
      }
    }, [])
  return (
    <>

      <section className="selectskins-container ">
        <h1 className="title-skins main-title-skins">YOUR Planes</h1>
        <div className="container cards-container pb-4 mb-4">
          {
          skins.data.map((item)=>{
            return (
            <div className='the-card-conatier'>
            <div className='imgbox'>
                <img src={item.imageUrl} alt="" className='plane-card-img test' />
            {/* <span></span> */}
            </div>
            <div className="line"></div>
            <div className="title ">{item.name}</div>
            <div className='buysection'>
            <button className="d-button mt-1 px-5 py-1 play-now" >
              <Link className="text-decoration-none" to={`/game?id=${item.id}`}>
                Play</Link></button>
            </div>
        </div>










            
          
          
          
          )
          })





        }
          </div>

      </section>
    </>
  );
}
