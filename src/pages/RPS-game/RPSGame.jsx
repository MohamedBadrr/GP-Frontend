/** @format */

import React, { useState, useEffect, useRef } from "react";
import * as handpose from "@tensorflow-models/handpose";
import * as tf from "@tensorflow/tfjs";
import Webcam from "react-webcam";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import rock from "../../assets/images/images_Ai/rock.png";
import paper from "../../assets/images/images_Ai/paper.png";
import scissor from "../../assets/images/images_Ai/scissors.png";
import axios from "axios";
import { getAuthUser, updateAuthUser } from "../../helper/Storage";
import LoadingPage from "../LoadingPage/LoadingPage";
import RingLoader from "react-spinners/ClipLoader";
const RPSGame = () => {
  const [qTable, setQTable] = useState({});
  const webcamRef = useRef(null);
  const canvasRef = useRef(null);
  const [gesture, setGesture] = useState(null);
  const [computerChoice, setComputerChoice] = useState(null);
  const [winner, setWinner] = useState(null);
  const [handDetected, setHandDetected] = useState(false);
  const [playerPatterns, setPlayerPatterns] = useState([]);
  const [aiPatterns, setAiPatterns] = useState([]);
  const [round, setround] = useState(0);
  const [airound, setairound] = useState(0);
  const [gamesRemaining, setGamesRemaining] = useState();
  const [loadingPage, setLoading] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const auth = getAuthUser();
  const [ailoading, setAiLoading] = useState(false);
  const [playerScore, setPlayerScore] = useState(0);
  const [computerScore, setComputerScore] = useState(0);
  let detectionNumber = 0
  const [user, setUser] = useState({
    loading: false,
    data: [],
    err: [],
  });
  const [champdata, setChampdata] = useState({
    loading: false,
    data: {},
    err: [],
  });
  useEffect(() => {
    const runHandpose = async () => {
      const net = await handpose.load().catch((errors)=>{
        console.log(errors);
      });
      setLoading("Handpose model loaded.");
      const intervalId = setInterval(() => {
        detect(net);
      }, 5000);
      return () => clearInterval(intervalId);
    };

    runHandpose();
  }, []);

  useEffect(() => {
    if (auth) {
      setUser({ ...user, loading: true, err: [] });
      axios
        .get("http://localhost:4000/user/info", {
          headers: {
            token: auth.token,
          },
        })
        .then((resp) => {
          setUser({ ...user, data: resp.data, loading: false, err: "" });
        })
        .catch((errors) => {
          setUser({
            ...user,
            loading: false,
            err: errors.response.data.errors[0].msg,
          });
        });
    }
  }, []);
  useEffect(() => {
    if (auth) {
      setChampdata({ ...champdata, loading: true, err: [] });
      axios
        .get("http://localhost:4000/RPS-game/spacificChamp/" + id, {
          headers: {
            token: auth.token,
          },
        })
        .then((resp) => {
          setChampdata({
            ...champdata,
            data: resp.data,
            loading: false,
            err: "",
          });
          // setGamesRemaining(resp.data.game_remaining);
          setGamesRemaining(10);
        })
        .catch((errors) => {
          console.log(errors);
          setChampdata({
            ...champdata,
            loading: false,
            err: errors.response.data.errors[0].msg,
          });
        });
    }
  }, []);
  const updateCoinsAndXp = (coins, xp, win) => {
    if (auth) {
      axios
        .put(
          "http://localhost:4000/game/update-coins",
          {
            coins: win ? user.data.coins + coins  : user.data.coins - coins,
            xp: user.data.xp + xp,
          },
          {
            headers: {
              token: auth.token,
            },
          }
        )
        .then((resp) => {
          // console.log(resp.data);
        })
        .catch((errors) => {
          console.log(errors);
          setChampdata({
            ...champdata,
            loading: false,
            err: errors.response.data.errors[0].msg,
          });
        });
    }
  };

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
          setGesture("rock ✊" );
          detectionNumber++
          // Update player's pattern
          setPlayerPatterns((prevPatterns) => [...prevPatterns, "rock ✊"]);
          setAiLoading(false);
        } else if (
          thumbTip[1] > indexTip[1] &&
          thumbTip[1] > middleTip[1] &&
          thumbTip[1] > ringTip[1] &&
          thumbTip[1] > pinkyTip[1]
        ) {
          setGesture("paper ✋");
          detectionNumber++
          // Update player's pattern
          setPlayerPatterns((prevPatterns) => [...prevPatterns, "paper ✋"]);
          setAiLoading(false);
        } else {
          setGesture("scissors ✌️");
          detectionNumber++
          // Update player's pattern
          setPlayerPatterns((prevPatterns) => [...prevPatterns, "scissors ✌️"]);
          setAiLoading(false);
        }
      } else {
        setAiLoading(true);
        setWinner(false);
        setComputerChoice(false);
      }
    }
  };

  const transformComputerchoiceToString = (choice) => {
    let transformedChoice;
    if (choice === rock) {
      transformedChoice = 'rock ✊'
      return transformedChoice ;
    }else if (choice === scissor){
      transformedChoice = 'scissors ✌️'
      return transformedChoice ;
    }else if (choice === paper){
      transformedChoice = 'paper ✋'
      return transformedChoice ;
    }
  };

  const updateAIAndMakeChoice = () => {
    if (playerPatterns.length >= 2 && aiPatterns.length >= 2) {
      const lastTwoPlayerPatterns = playerPatterns.slice(-2).join("");
      const lastTwoAiPatterns = aiPatterns.slice(-2).join("");
      const currentState = lastTwoPlayerPatterns + lastTwoAiPatterns;
      let bestChoice = null;
      let bestChoiceValue = -Infinity;
      let choiceImage
      if (!qTable[currentState]) {
        qTable[currentState] = {};
        qTable[currentState]["rock ✊"] = Math.random();
        qTable[currentState]["paper ✋"] = Math.random();
        qTable[currentState]["scissors ✌️"] = Math.random();
      }
      // check if the choise returned successfully
      if (qTable) {
        for (const choice in qTable[currentState]) {
          if (qTable[currentState][choice] > bestChoiceValue) {
            bestChoice = choice ;
            bestChoiceValue = qTable[currentState][choice] ;
          }
        }
        if (bestChoice === 'rock ✊') {
          choiceImage = rock;
        }else if (bestChoice === 'paper ✋'){
          choiceImage = paper;
        }else if (bestChoice === 'scissors ✌️'){
          choiceImage = scissor;
        }
        setComputerChoice(choiceImage);
        setAiPatterns((prevPatterns) => [...prevPatterns, bestChoice]);
        return choiceImage
    };
  } else {
      const choices = [rock, paper, scissor];
      const randomIndex = Math.floor(Math.random() * choices.length);
      let choice = choices[randomIndex]
      setComputerChoice(choice) 
      // console.log(choice);
      // transform choise (image url) to string like 'rock' etc
      let computerChoiseString = transformComputerchoiceToString(choice)
      // asign ai pattern
      setAiPatterns((prevPatterns) => [...prevPatterns, computerChoiseString]);
      return choice
    }
  };

  useEffect(() => {
    if (gesture) {
      // check if the round ended
        if (gamesRemaining === 1) {
          setTimeout(function() {
              endChampionship();
          }, 3000); 
      }
      // Update AI's pattern and make a choice
      const choise = updateAIAndMakeChoice();
      let newChoice = transformComputerchoiceToString(choise);
      if (
        (gesture === "rock ✊" && newChoice === 'scissors ✌️') ||
        (gesture === "paper ✋" && newChoice === 'rock ✊') ||
        (gesture === "scissors ✌️" && newChoice === 'paper ✋')
      ) {
        setWinner("Player");
        setPlayerScore((prevScore) => prevScore + 1);
        setGamesRemaining(gamesRemaining - 1);
        // setComputerChoice(computerChoice);
        updateQTable("loss");
        setround(round + 1);
      } else if (
        (gesture === "paper ✋" && newChoice === 'scissors ✌️') ||
        (gesture === "rock ✊" && newChoice === 'paper ✋') ||
        (gesture === "scissors ✌️" && newChoice === 'rock ✊')
      ) {
        setWinner("Computer");
        setGamesRemaining(gamesRemaining - 1);
        setComputerScore((prevScore) => prevScore + 1);
        // setComputerChoice(computerChoice);
        setairound(airound + 1);
        updateQTable("win");
      } else {
        setWinner("no one");
        setGamesRemaining(gamesRemaining - 1);
        // setComputerChoice(computerChoice);
        updateQTable("draw");
      }
    }
  }, [gesture, handDetected, champdata]);

  const updateQTable = (result) => {
    if (playerPatterns.length >= 2 && aiPatterns.length >= 2) {
      const lastTwoPlayerPatterns = playerPatterns.slice(-2).join("");
      const lastTwoAiPatterns = aiPatterns.slice(-2).join("");
      const currentState = lastTwoPlayerPatterns + lastTwoAiPatterns;

      // Check if currentState exists in the qTable, if not, initialize it
      if (!qTable[currentState]) {
        qTable[currentState] = {};
        qTable[currentState]["rock ✊"] = Math.random();
        qTable[currentState]["paper ✋"] = Math.random();
        qTable[currentState]["scissors ✌️"] = Math.random();
      }

      let reward = 0;
      if (result === "win") reward = 1;
      else if (result === "loss") reward = -1;

      const alpha = 0.1; // Learning rate
      const gamma = 0.9; // Discount factor

      // Calculate the updated Q-value
      const maxNextStateQValue = Math.max(
        ...Object.values(qTable[currentState])
      );
      // console.log(maxNextStateQValue+' maxNextStateQValue');
      let computerChoiseString = transformComputerchoiceToString(computerChoice)
      const updatedQValue =
      qTable[currentState][computerChoiseString] + alpha * (reward + gamma * maxNextStateQValue - qTable[currentState][computerChoiseString]);
      qTable[currentState][computerChoiseString] = updatedQValue ; 
      // console.log(qTable[currentState]);
      setQTable({ ...qTable }); // Update the state of the Q-table
    }
  };

  const endChampionship = () => {
    if (round > airound) {
      setWinner("Player");
      // updateCoinsAndXp(champdata.data.price, 20, true);
      // updateAuthUser();
      // navigate("/winnerRPS");
      // window.location.reload();
      // console.log(playerPatterns);
      // console.log(aiPatterns);
      // console.log(qTable);

    } else if (airound > round) {
      setWinner("Computer");
      // updateCoinsAndXp(champdata.data.price, 10, false);
      // updateAuthUser();
      // navigate("/gameoverRPS");
      // window.location.reload();
      // console.log(playerPatterns);
      // console.log(aiPatterns);
      // console.log(qTable);

    } else {
      // navigate("/gameoverRPS");
      // window.location.reload();
      // console.log(playerPatterns);
      // console.log(aiPatterns);
      // console.log(qTable);

    }
  };

  return loadingPage ? (
    
    <div className="all">
        <div className="score-window">
        <h2>Score</h2>
        <div className="score">
          <p> {computerScore}</p>
          <p>&nbsp;Vs&nbsp; </p>
          <p> {playerScore}</p>
        </div>
      </div>
      <div className="playing container">
        <div className="players">
          <div>
            <h1 className="computer">Computer</h1>
          </div>
          <div>
            <h1 className="playername">{auth.name}</h1>
            {gesture && (
              <h3 className="yourgesture">
                Your gesture : <span>{gesture}</span>
              </h3>
            )}
            
          </div>
        </div>
        <RingLoader className="ailoading"
        color="#ffffff"
          size={300}
          loading = {ailoading}
          />
        <Webcam ref={webcamRef} mirrored={true} className="camera"/>
        <canvas ref={canvasRef} className="canvas"/>
        {gesture && handDetected && (
          <div>
            {computerChoice && (
              <p
                style={{
                  color: "white",
                  fontFamily: "Jersey 10 Charted, sans-serif",
                }}>
                {" "}
                <img
                  src={computerChoice}
                  alt="Computer choice"
                  className="computer-player"></img>
              </p>
            )}
          </div>
        )}
        {gesture && (
          <>
            {winner && (
              <h1 className="winnertext" style={{ color: "white" }}>
                {" "}
                <span className="text-info">{winner}</span> wins ...!
              </h1>
            )}
          </>
        )}
      </div>
    </div>
    
  ) : (
    <LoadingPage />
  );
};

export default RPSGame;
