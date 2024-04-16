import React, { useEffect, useState } from 'react';
import "./Winner.css"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useTypewriter , Cursor, Typewriter } from 'react-simple-typewriter';
import imgWinner from "../../assets/images/winner.png"


const Winner = () => {
  return (
    <>
        <div className="container-winner-game">
            <div className='winner-titles'>
                <h2 className='winnernumbers'></h2>
                <h2>
                <i class="fa-solid fa-trophy mx-4"></i>
                  <span>
                  <Typewriter
                      words={['YOU ARE Winner...!']}
                      loop={false}
                      cursor
                      cursorStyle=","
                      typeSpeed={90}
                      deleteSpeed={0}
                      delaySpeed={150000}
                      
                    /></span>
                  <i class="fa-solid fa-trophy mx-4"></i>
                </h2>
                <img src={imgWinner} alt="" className='asd'/>
                <Link to={"/user"}><h3>play again?</h3></Link>
                <Link to={"/home"}><h3>back to main menu?</h3></Link>
            </div>
        </div>
    </>
  );
}

export default Winner;