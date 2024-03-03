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
  const [started, setStarted] = useState(false); // State to track if the game has started
  const [winner, setWinner] = useState(null); // State to track the winner
  const [handDetected, setHandDetected] = useState(false); // State to track if hand is detected


  useEffect(() => {
    const handleKeyPress = (event) => {
      setStarted(true);
      // setEndGame(false) // Set started to true when any key is pressed
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

        // Detection loop
        const intervalId = setInterval(() => {
          detect(net);
        }, 3000);

        return () => clearInterval(intervalId);
      };

      runHandpose();
    }
  }, [started ]);

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get video properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;

      // Set video dimensions
      webcamRef.current.video.width = videoWidth;
      webcamRef.current.video.height = videoHeight;

      // Set canvas dimensions
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;

      // Make detections
      const hand = await net.estimateHands(video);
      console.log(hand);

      // Check if hand is detected
      if (hand.length > 0) {
        // Set hand detected to true
        setHandDetected(true);
        
        const fingers = hand[0].landmarks;
        const thumbTip = fingers[4];
        const indexTip = fingers[8];
        const middleTip = fingers[12];
        const ringTip = fingers[16];
        const pinkyTip = fingers[20];

        // Check if thumb, index, and middle fingers are up
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
      } else {
        // Set hand detected to false
        setHandDetected(false);
      }
    }
  };

  const generateComputerChoice = () => {
    const choices = [rock, paper, scissor];
    const randomIndex = Math.floor(Math.random() * choices.length);
    return choices[randomIndex];
  };

  useEffect(() => {
    if (gesture && handDetected) {
      const computerChoice = generateComputerChoice();
      setComputerChoice(computerChoice);

      // Determine the winner
      if (
        (gesture === "rock" && computerChoice === scissor) ||
        (gesture === "paper" && computerChoice === rock) ||
        (gesture === "scissors" && computerChoice === paper)
      ) {
        setWinner("Player");
      } else if (
        (computerChoice === "rock" && gesture === scissor) ||
        (computerChoice === "paper" && gesture === rock) ||
        (gesture === "paper" && computerChoice === scissor) ||
        (gesture === "rock" && computerChoice === paper) ||
        (gesture === "scissors" && computerChoice === rock) ||
        (computerChoice === "scissors" && gesture === paper)
      ) {
        setWinner("Computer");
      } else {
        setWinner("no one");
      }
    }
  }, [gesture, handDetected]);

  return (
    <div>
      {!started &&  <p className="" style={{
              color: 'black'
            }}>Press any key to start the game</p>}
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
              top : 100,
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
            <div >
              <p style={{
              color: 'black'
            }}>Your gesture: {gesture}</p>
              {computerChoice && <p style={{
              color: 'black'
            }}>Computer choice: <img src={computerChoice} alt="Computer choice"></img></p>}
              {winner && <p style={{
              color: 'black'
            }}>{winner} wins!</p>}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default RPSGame;
