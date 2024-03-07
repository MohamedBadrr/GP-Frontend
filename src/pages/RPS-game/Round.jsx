import React ,{ useState, useEffect, useRef } from 'react'
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "../../utilities";
import {useNavigate} from "react-router-dom"
import rock from "../../images_Ai/rock.png";
import paper from "../../images_Ai/paper.png";
import scissor from "../../images_Ai/scissors.png";
import Championship from "../../components/Championship";
import RPSGame from './RPSGame';





const Round = () => {
  
      const [coins, setCoins] = useState(500);
      const [qTable, setQTable] = useState({});
    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [gesture, setGesture] = useState(null);
    const [computerChoice, setComputerChoice] = useState(null);
    const [started, setStarted] = useState(false);
    const [winner, setWinner] = useState(null);
    const [handDetected, setHandDetected] = useState(false);
    const [playerPatterns, setPlayerPatterns] = useState([]);
    const [aiPatterns, setAiPatterns] = useState([]);
    const [round, setround] = useState(0);
    const [airound, setairound] = useState(0);
    const [currentChampionship, setCurrentChampionship] = useState(null);
    const [gamesRemaining, setGamesRemaining] = useState();
    const navigate = useNavigate();
  
    useEffect(() => {
          const runHandpose = async () => {
            const net = await handpose.load();
            console.log("Handpose model loaded.");
    
            const intervalId = setInterval(() => {
              detect(net);
            }, 3000);
    
            return () => clearInterval(intervalId);
          };
    
          runHandpose();
      }, []);
    
      const detect = async (net) => {
        if (
          typeof webcamRef.current !== "undefined" &&
          webcamRef.current !== null &&
          webcamRef.current.video.readyState === 4
        ) {
          const video = webcamRef.current.video;
          const videoWidth = webcamRef.current.video.videoWidth;
          const videoHeight = webcamRef.current.video.videoHeight;
    
          webcamRef.current.video.width = videoWidth;
          webcamRef.current.video.height = videoHeight;
    
          canvasRef.current.width = videoWidth;
          canvasRef.current.height = videoHeight;
    
          const hand = await net.estimateHands(video);
          console.log(hand);
    
          if (hand.length > 0) {
            setHandDetected(true);
    
            const fingers = hand[0].landmarks;
            const thumbTip = fingers[4];
            const indexTip = fingers[8];
            const middleTip = fingers[12];
            const ringTip = fingers[16];
            const pinkyTip = fingers[20];
    
            if (
              thumbTip[1] < indexTip[1] &&
              thumbTip[1] < middleTip[1] &&
              thumbTip[1] < ringTip[1] &&
              thumbTip[1] < pinkyTip[1]
            ) {
              setGesture("rock");
            } else if (
              thumbTip[1] > indexTip[1] &&
              thumbTip[1] > middleTip[1] &&
              thumbTip[1] > ringTip[1] &&
              thumbTip[1] > pinkyTip[1]
            ) {
              setGesture("paper");
            } else {
              setGesture("scissors");
            }
            
            
            
    
            // Update player's pattern
            setPlayerPatterns(prevPatterns => [...prevPatterns, gesture]);
            // Update AI's pattern and make a choice
            updateAIAndMakeChoice();
          } else {
            setHandDetected(false);
          }
        }
      };
    
      const generateComputerChoice = () => {
        const choices = [rock, paper, scissor];
        const randomIndex = Math.floor(Math.random() * choices.length);
        return choices[randomIndex];
      };
    
      const updateAIAndMakeChoice = () => {
        if (playerPatterns.length >= 2) {
          const lastTwoPlayerPatterns = playerPatterns.slice(-2).join("");
          const lastTwoAiPatterns = aiPatterns.slice(-2).join("");
          const currentState = lastTwoPlayerPatterns + lastTwoAiPatterns;
          
          if (!qTable[currentState]) {
            qTable[currentState] = {};
            qTable[currentState]["rock"] = Math.random();
            qTable[currentState]["paper"] = Math.random();
            qTable[currentState]["scissors"] = Math.random();
          }
    
          let bestChoice = null;
          let bestChoiceValue = -Infinity;
          for (const choice in qTable[currentState]) {
            if (qTable[currentState][choice] > bestChoiceValue) {
              bestChoice = choice;
              bestChoiceValue = qTable[currentState][choice];
            }
          }
    
          setComputerChoice(bestChoice);
          setAiPatterns(prevPatterns => [...prevPatterns, bestChoice]);
        } else {
          // Generate random choice if not enough data
          
          setAiPatterns(prevPatterns => [...prevPatterns]);
        }
      };
    
      useEffect(() => {
        if (gesture && handDetected) {
          const computerChoice = generateComputerChoice();
          setComputerChoice(computerChoice);
    
          if (
            (gesture === "rock" && computerChoice === scissor) ||
            (gesture === "paper" && computerChoice === rock) ||
            (gesture === "scissors" && computerChoice === paper)
          ) {
            setWinner("Player");
            updateQTable("loss");
            setround(round +1);
          } else if (
            (gesture === "paper" && computerChoice === scissor) ||
            (gesture === "rock" && computerChoice === paper) ||
            (gesture === "scissors" && computerChoice === rock)
          ) {
            setWinner("Computer");
            setairound(airound +1);
            updateQTable("win");
          } else {
            setWinner("no one");
            updateQTable("draw");
           
          }
          
    
          setGamesRemaining(prevGames => prevGames - 1);
          if (gamesRemaining === 0) {
            endChampionship();
          }
        }
      }, [gesture, handDetected]);
    
      const updateQTable = (result) => {
        if (playerPatterns.length >= 2 && aiPatterns.length >= 2) {
          const lastTwoPlayerPatterns = playerPatterns.slice(-2).join("");
          const lastTwoAiPatterns = aiPatterns.slice(-2).join("");
          const currentState = lastTwoPlayerPatterns + lastTwoAiPatterns;
      
          // Check if currentState exists in the qTable, if not, initialize it
          if (!qTable[currentState]) {
            qTable[currentState] = {};
            qTable[currentState]["rock"] = Math.random();
            qTable[currentState]["paper"] = Math.random();
            qTable[currentState]["scissors"] = Math.random();
          }
      
          let reward = 0;
          if (result === "win") reward = 1;
          else if (result === "loss") reward = -1;
      
          const alpha = 0.1; // Learning rate
          const gamma = 0.9; // Discount factor
      
          // Calculate the updated Q-value
          const maxNextStateQValue = Math.max(...Object.values(qTable[currentState]));
          const updatedQValue = qTable[currentState][computerChoice] + alpha * (reward + gamma * maxNextStateQValue - qTable[currentState][computerChoice]);
          qTable[currentState][computerChoice] = updatedQValue;
      
          setQTable({ ...qTable }); // Update the state of the Q-table
          
        }
      };
    
    
      const endChampionship = () => {

        if (round > airound) {
          setWinner("Player");
          setCoins(coins +100);
          alert("player win");
          navigate('/RPS-Game')
      
        } else if( airound > round)  {
          setWinner("Computer");
          alert("computer win");
          navigate('/RPS-Game');
    
        }else if(round = airound){
          setGamesRemaining(gamesRemaining +1);
        }
        
        // Reset patterns and gamesRemaining
        setPlayerPatterns([]);
        setAiPatterns([]);
        setStarted(false);
        setCurrentChampionship(null);
      };
      
  return (
    <>
    <Webcam
        ref={webcamRef}
        mirrored={true}
        style={{
            position: "absolute",
            marginLeft: "auto",
            left: 0,
            right: 0,
            top: 100,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
        }}
        />
        <canvas
        ref={canvasRef}
        style={{
            position: "absolute",
            marginLeft: "auto",
            marginRight: "auto",
            left: 0,
            right: 20,
            textAlign: "center",
            zIndex: 9,
            width: 640,
            height: 480,
        }}
        />
        {gesture && (
        <div>
            <p style={{ color: "black" }}>Your gesture: {gesture}</p>
            {computerChoice && <p style={{ color: "black" }}>Computer choice: <img src={computerChoice} alt="Computer choice"></img></p>}
            {winner && <p style={{ color: "black" }}>{winner} wins!</p>}
        </div>
        )}
    </>
  )
}

export default Round;
