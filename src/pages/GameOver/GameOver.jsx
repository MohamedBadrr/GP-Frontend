import React, { useEffect, useState } from 'react';
import "./GameOver.css"
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useTypewriter , Cursor, Typewriter } from 'react-simple-typewriter';
import soundFile from "../../assets/sounds/gameoversound.mp4"


const GameOver = () => {

  const [audio] = useState(new Audio(soundFile));
  useEffect(() => {
    const playAudio = () => {
      audio.play();
      audio.removeEventListener('play', playAudio);
    };
    audio.addEventListener('play', playAudio);
  }, []);

  const audioStyle = {
    position: 'absolute',
    left: '-9999px',
    top: '-9999px',
  };





  const navigate = useNavigate();
  const [counter, setCounter] = useState(5000);

  useEffect(()=>{
   const timerId = setInterval(()=>{
    if(counter>0){
      setCounter(counter-1);
    }
    else{
      clearInterval(timerId);
      navigate("/selectskin");
    }
   },1000)
  },[counter])

 
  return (
    <>
       <div className='game-over'>
       <div className="container-game-over">
            <div className='gameover-titles'>
                <h2 className='numbers'>{counter}</h2>
                <audio style={audioStyle} autoPlay loop >
                  <source src={soundFile} type="audio/mpeg" />
                </audio>
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
                <a to={"/selectskin"}><h3>play again?</h3></a>
            </div>
        </div> 
       </div>
    </>
  );
}

export default GameOver;
