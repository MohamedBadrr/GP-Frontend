import React, { useState, useEffect, useRef } from "react";
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "../utilities";
import rock from "../images_Ai/rock.png";
import paper from "../images_Ai/paper.png";
import scissor from "../images_Ai/scissors.png";

const RPSGame = () => {
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [gesture, setGesture] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [started, setStarted] = useState(false);
  const [winner, setWinner] = useState(null);
  const [handDetected, setHandDetected] = useState(false);
  const [playerPatterns, setPlayerPatterns] = useState([]);
  const [aiPatterns, setAiPatterns] = useState([]);
  const [qTable, setQTable] = useState({});
  const [coins, setCoins] = useState(50);
  const [championshipsRemaining, setChampionshipsRemaining] = useState({
    1: { cost: 50, remaining: 5 },
    2: { cost: 200, remaining: 5 },
    3: { cost: 400, remaining: 5 }
  });
  const [currentChampionship, setCurrentChampionship] = useState(null);
  const [gamesRemaining, setGamesRemaining] = useState(5);

  useEffect(() => {
    const handleKeyPress = (event) => {
      setStarted(true);
    };

    document.addEventListener("keydown", handleKeyPress);

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);

  useEffect(() => {
    if (started) {
      const runHandpose = async () => {
        const net = await handpose.load();
        console.log("Handpose model loaded.");

        const intervalId = setInterval(() => {
          detect(net);
        }, 3000);

        return () => clearInterval(intervalId);
      };

      runHandpose();
    }
  }, [started]);

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
      const randomChoice = generateComputerChoice();
      setComputerChoice(randomChoice);
      setAiPatterns(prevPatterns => [...prevPatterns, randomChoice]);
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
        updateQTable("win");
        setCoins(coins + 50);
      } else if (
        (gesture === "paper" && computerChoice === scissor) ||
        (gesture === "rock" && computerChoice === paper) ||
        (gesture === "scissors" && computerChoice === rock)
      ) {
        setWinner("Computer");
        updateQTable("loss");
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

  const startChampionship = (championship) => {
    const championshipData = championshipsRemaining[championship];
    if (coins >= championshipData.cost && championshipData.remaining > 0) {
      setCurrentChampionship(championship);
      setGamesRemaining(5);
      setStarted(true);
      setCoins(coins - championshipData.cost);
    } else {
      alert("Not enough coins or championships remaining!");
    }
  };

  const endChampionship = () => {
    // Calculate championship winner
    const playerWins = playerPatterns.filter(pattern => pattern === "win").length;
    const aiWins = aiPatterns.filter(pattern => pattern === "win").length;

    if (playerWins > aiWins) {
      setWinner("Player");
      setCoins(coins + 50);
    } else if (aiWins > playerWins) {
      setWinner("Computer");
    } else {
      // If no one wins, add another detection
      setGamesRemaining(1);
    }

    // Reset patterns and gamesRemaining
    setPlayerPatterns([]);
    setAiPatterns([]);
    setStarted(false);
    setCurrentChampionship(null);
  };

  return (
    <div>
      {!started && (
        <div>
          <p className="" style={{ color: "black" }}>Press any key to start the game</p>
          <p className="" style={{ color: "black" }}>You have {coins} coins</p>
          <button onClick={() => startChampionship(1)} style={{marginBottom: '10px'}}>Start Championship 1 (Costs 50 coins)</button>
          <button onClick={() => startChampionship(2)} style={{marginBottom: '10px'}}>Start Championship 2 (Costs 200 coins)</button>
          <button onClick={() => startChampionship(3)} style={{marginBottom: '10px'}}>Start Championship 3 (Costs 400 coins)</button>
          <p className="" style={{ color: "black" }}>Championships Remaining: {championshipsRemaining[1].remaining}</p>
        </div>
      )}
      {started && (
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
      )}
    </div>
  );
};

export default RPSGame;
