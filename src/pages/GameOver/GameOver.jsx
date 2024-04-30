import React, { useEffect, useState } from 'react';
import "./GameOver.css"
import { Link, useNavigate } from 'react-router-dom';
import { Typewriter } from 'react-simple-typewriter';
import soundFile from "../../assets/sounds/gameoversound.mp4"


const GameOver = (props) => {
  const [audio] = useState(new Audio(soundFile));
  useEffect(() => {
    const playAudio = () => {
      audio.play();
      audio.removeEventListener('play', playAudio);
    };
    audio.addEventListener('play', playAudio);
  }, [audio]);

  const audioStyle = {
    position: 'absolute',
    left: '-9999px',
    top: '-9999px',
  };

  const navigate = useNavigate();
  const [counter, setCounter] = useState(5);

  useEffect(() => {
    const timerId = setInterval(() => {
      if (counter > 0) {
        setCounter(counter - 1);
      }
      else {
        clearInterval(timerId);
        navigate(`/${props.playagin}`);
      }
    }, 1000)
  }, [counter])


  return (
    <>
      <div className='game-over'>
        <div className="game-over-container">
          <div className='game-over-titles'>
            <h2 className='game-over-numbers'>{counter}</h2>
            <audio style={audioStyle} autoPlay loop >
              <source src={soundFile} type="audio/mpeg" />
            </audio>
            <span>
              <h2><Typewriter
                words={['GAME OVER']}
                loop={false}
                cursor
                cursorStyle=","
                typeSpeed={150}
                deleteSpeed={0}
                delaySpeed={150000}
              /></h2>
            </span>
            <Link to={`/${props.playagin}`}><h3>play again?</h3></Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default GameOver;
