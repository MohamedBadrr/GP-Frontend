/** @format */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Championship.css";
import "../RPSGame.css";
import imgCard from "../../../assets/images/kas2.png"
const Championship = (props) => {
  const navigate = useNavigate();
  // const auth = getAuthUser();
  const [showBuyAlert, setShowBuyAlert] = useState({});
  const handleLockClick = (itemId) => {
    setShowBuyAlert({ ...showBuyAlert, [itemId]: true }); // Set alert for specific item ID
    // Optionally, reset showBuyAlert after a brief delay
    setTimeout(
      () => setShowBuyAlert({ ...showBuyAlert, [itemId]: false }),
      2000
    ); // Adjust timeout as needed
  };

  return (
    <div class="box-item">
      <div class="flip-box">
        <div class="flip-box-front text-center" style={{ backgroundImage: `url(${imgCard})` }}>
          <div class="inner color-white">
            <h1>{props.name}</h1>
            <h3>Cost : {props.cost} coins</h3>
          </div>
        </div>
        {props.userConis < props.cost ? (
          <button
            className="default-button ms-4 mb-3 mt-2 px-4 py-1"
            onClick={(e) => {
              handleLockClick(props.id);
            }}>
            <div
              class="flip-box-back text-center"
              style={{ backgroundImage: `url(${imgCard})` }}>
              {showBuyAlert[props.id] && ( 
                <div className="alert alert-danger p-1 mx-2 my-2">
                  You Don't Have Enough Coins
                </div>
              )}
              <div class="inner-card color-white">
                <h3 class="flip-box-header">{props.name}</h3>
                <h3 class="flip-box-header">{`Cost : ${props.cost}`}</h3>
                {props.userConis < props.cost ? (
                  <i
                    className="fa-solid fa-lock lock-icon-skin lockChampion"
                    onClick={() => {
                      console.log("locked");
                    }}></i>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </button>
        ) 
        
        
        :
        
        
        
        
        (
          <button
            className="default-button mb-3 mt-2 px-4 py-1 ms-4"
            onClick={(e) => {
              navigate("/game-round/" + props.id);
            }}>
            <div
              class="flip-box-back text-center"
              style={{ backgroundImage: `url(${imgCard})` }}>
              <div class="inner-card color-white">
                <h3 class="flip-box-header">{props.name}</h3>
                <h3 class="flip-box-header">{`Cost : ${props.cost}`}</h3>
                {props.userConis < props.cost ? (
                  <i
                    className="fa-solid fa-lock lock-icon-skin lockChampion"
                    onClick={() => {
                      console.log("locked");
                    }}></i>
                ) : (
                  <></>
                )}
              </div>
            </div>
          </button>
        )}
      </div>
    </div>
  );
};

export default Championship;
