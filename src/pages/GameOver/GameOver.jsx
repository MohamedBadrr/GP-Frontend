import React, { useEffect, useState } from 'react';
import "./GameOver.css"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useTypewriter , Cursor, Typewriter } from 'react-simple-typewriter';


const GameOver = () => {
  const navigate = useNavigate();
  const [counter, setCounter] = useState(5);

  useEffect(()=>{
   const timerId = setInterval(()=>{
    if(counter>0){
      setCounter(counter-1);
    }
    else{
      clearInterval(timerId);
      navigate("/user");
    }
   },1000)
  },[counter])

 
  return (
    <>
        <div className="container-game-over">
            <div className='gameover-titles'>
                <h2 className='numbers'>{counter}</h2>
                <span>
                <h2><Typewriter
                      words={['GAME OVER']}
                      // Add loop prop with the desired value (true or false)
                      loop={false}
                      cursor
                      cursorStyle=","
                      typeSpeed={150}
                      deleteSpeed={0}
                      delaySpeed={150000}
                    /></h2>
                </span>
                <Link to={"/user"}><h3>play again?</h3></Link>
            </div>
        </div>
    </>
  );
}

export default GameOver;
