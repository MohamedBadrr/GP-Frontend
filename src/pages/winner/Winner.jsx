/** @format */
import React, { useEffect, useState } from "react";
import "./Winner.css";
import { Link } from "react-router-dom";
import { Typewriter } from "react-simple-typewriter";
import imgWinner from "../../assets/images/winner.png";
import soundFile from "../../assets/sounds/win.mp4";

const Winner = () => {
  const [audio] = useState(new Audio(soundFile));
  useEffect(() => {
    const playAudio = () => {
      audio.play();
      audio.removeEventListener("play", playAudio);
    };
    audio.addEventListener("play", playAudio);
  }, [audio]);

  const audioStyle = {
    position: "absolute",
    left: "-9999px",
    top: "-9999px",
  };

  
  return (
    <>
        <div className='winner'>
        <div className="container-winner-game">
            <div className='winner-titles'>
                {/* <h2 className='winnernumbers'></h2> */}
                <h2>
                <audio style={audioStyle} autoPlay loop >
                  <source src={soundFile} type="audio/mpeg" />
                </audio>
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
                <Link to={"/selectskin"}><h3>play again?</h3></Link>
                <Link to={"/home"}><h3>back to main menu?</h3></Link>
            </div>
        </div>
      </div>
    </>
  );
};

export default Winner;
