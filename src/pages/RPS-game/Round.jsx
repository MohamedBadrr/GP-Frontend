import React ,{ useState, useEffect, useRef } from 'react'
import * as tf from "@tensorflow/tfjs";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { drawHand } from "../../utilities";
import {useNavigate, useParams, useSearchParams} from "react-router-dom"
import rock from "../../images_Ai/rock.png";
import paper from "../../images_Ai/paper.png";
import scissor from "../../images_Ai/scissors.png";
import Championship from "../../components/Championship";
import RPSGame from './RPSGame';
import axios from 'axios';
import { getAuthUser } from '../../helper/Storage';





const Round = () => {
  
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
    const [loadingPage, setLoading] = useState("");
    const navigate = useNavigate();
    // const [queryParameters] = useSearchParams();
    const {id} = useParams();
    const auth = getAuthUser();
    
    const [user, setUser] = useState({
      loading : false,
      data : [] ,
      err : []
    });
    const [ champdata , setChampdata ] = useState({
      loading : false,
      data : {},
      err : []
    })
    useEffect(() => {
          const runHandpose = async () => {
            const net = await handpose.load();
            console.log("Handpose model loaded.");
            setLoading("Handpose model loaded.")
            const intervalId = setInterval(() => {
              detect(net);
            }, 3000);
    
            return () => clearInterval(intervalId);
          };
    
          runHandpose();
      }, []);

      useEffect(() => {
        if (auth) {
          setUser({...user , loading:true , err:[]});
          axios.get("http://localhost:4000/user/info",
          {
            headers:{
              token : auth.token
            }
          }).then((resp) =>{
            console.log(resp.data);
            setUser({...user, data : resp.data , loading:false , err:""})
      
          }).catch((errors)=>{
              console.log(errors);
              setUser({...user , loading:false , err:errors.response.data.errors[0].msg})
          });
        }
      }, [])
      useEffect(() => {
        if (auth) {
          setChampdata({...champdata , loading:true , err:[]});
          axios.get("http://localhost:4000/RPS-game/spacificChamp/"+id,
          {
            headers:{
              token : auth.token
            }
          }).then((resp) =>{
            setChampdata({...champdata, data : resp.data , loading:false , err:""})
            console.log(champdata.data);
          }).catch((errors)=>{
              console.log(errors);
              setChampdata({...champdata , loading:false , err:errors.response.data.errors[0].msg})
          });
        }
      }, [])
    
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
        setGamesRemaining(champdata.data.game_remaining );
        console.log(gamesRemaining);
        if (gesture && handDetected) {
          const computerChoice = generateComputerChoice();
          setComputerChoice(computerChoice);
         

    
          if (
            (gesture === "rock" && computerChoice === scissor) ||
            (gesture === "paper" && computerChoice === rock) ||
            (gesture === "scissors" && computerChoice === paper)
          ) {
            setWinner("Player");
            setGamesRemaining(gamesRemaining -1);
            updateQTable("loss");
            setround(round +1);
          } else if (
            (gesture === "paper" && computerChoice === scissor) ||
            (gesture === "rock" && computerChoice === paper) ||
            (gesture === "scissors" && computerChoice === rock)
          ) {
            setWinner("Computer");
            setGamesRemaining(gamesRemaining -1);
            setairound(airound +1);
            updateQTable("win");
          } else {
            setWinner("no one");
            setGamesRemaining(gamesRemaining -1);
            updateQTable("draw");
           
           
          }
          console.log(gamesRemaining);
          console.log(champdata.data.game_remaining);
          
          if (gamesRemaining === 0) {
            endChampionship();
          }
        }
      }, [gesture, handDetected , champdata]);
    
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
          setUser(user.data.coins + 100);
          alert("player win");
          navigate('/RPS-Game')
      
        } else if ( airound > round)  {
          setWinner("Computer");
          alert("computer win");
          navigate('/RPS-Game');
    
        }else {
          alert("try agian");
        }
      
        // Reset patterns and gamesRemaining
      };
      // const startChampionship = () => {
        
      //   if (user.data.coins >= champdata.data.price) {
            
      //       setGamesRemaining( gamesRemaining === champdata.data.game_remaining ); 
      //   } else {
      //       alert("Not enough coins to enter the championship.");
      //   }
    // };
    
  return (
    loadingPage?
    <div className='playing container'>
     <div className='players'>
     <div>
     <h1 className='text-dark'>Computer</h1>
    
     </div>
     <div>
     <h1 className='text-dark  player-name'>{auth.name}</h1>
        {gesture && (<h3 className='text-dark'>Your gesture : <span className='text-info'>{gesture}</span></h3>)}
     </div>
     </div>
    <Webcam
        ref={webcamRef}
        mirrored={true}
        style={{
            position: "absolute",
            marginLeft: "auto",
            left: 0,
            right: 80,
            top: 150,
            textAlign: "center",
            zIndex: 9,
            width: 500,
            height: 400,
            borderRadius:"100px",
            marginTop:"60px",
            marginRight:"60px"
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
            width: 540,
            height: 350,
        }}
        />
        {gesture && (
        <div>
            {computerChoice && <p style={{ color: "black" }}> <img src={computerChoice} alt="Computer choice" className='computer-player'></img></p>}
        </div>
        )}
                {gesture && (<>{winner && <h1 className='text-center' style={{ color: "black" }}> <span className='text-info'>{winner}</span> wins ...!</h1>}</>)}
    </div>
    :
    <div className='Loading-Page'>
        <i class="fa-solid fa-spinner fa-5x text-dark mt-5 fa-spin">
    </i></div>
  )
}

export default Round;
