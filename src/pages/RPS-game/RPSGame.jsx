import React ,{ useState, useEffect, useRef } from 'react'
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import {useNavigate, useParams, useSearchParams} from "react-router-dom"
import rock from "../../assets/images/images_Ai/rock.png";
import paper from "../../assets/images/images_Ai/paper.png";
import scissor from "../../assets/images/images_Ai/scissors.png";
import axios from 'axios';
import { getAuthUser, updateAuthUser } from '../../helper/Storage';
import LoadingPage from '../LoadingPage/LoadingPage';





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
            
            setLoading("Handpose model loaded.")
            const intervalId = setInterval(() => {
              detect(net);
            }, 5000);
    
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
            setGamesRemaining( resp.data.game_remaining );
          }).catch((errors)=>{
              console.log(errors);
              setChampdata({...champdata , loading:false , err:errors.response.data.errors[0].msg})
          });
        }
      }, [])
      const updateCoinsAndXp = (coins,xp,win) =>{
        if (auth) {
          axios.put("http://localhost:4000/game/update-coins" ,{
            coins : (win)?(user.data.coins + coins *2) : (user.data.coins - coins) ,
            xp: user.data.xp + xp
          },
          {
            headers:{
              token : auth.token
            }
          }).then((resp) =>{
            console.log(resp.data);
          }).catch((errors)=>{
              console.log(errors);
              setChampdata({...champdata , loading:false , err:errors.response.data.errors[0].msg})
          });
        }
      }
    
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
        
        if (gesture ) {
          const computerChoice = generateComputerChoice();
          if (
            (gesture === "rock" && computerChoice === scissor) ||
            (gesture === "paper" && computerChoice === rock) ||
            (gesture === "scissors" && computerChoice === paper)
          ) {
            setWinner("Player");
            setGamesRemaining(gamesRemaining -1);
            setComputerChoice(computerChoice);
            updateQTable("loss");
            setround(round +1);
          } else if (
            (gesture === "paper" && computerChoice === scissor) ||
            (gesture === "rock" && computerChoice === paper) ||
            (gesture === "scissors" && computerChoice === rock)
          ) {
            setWinner("Computer");
            setGamesRemaining(gamesRemaining -1);
            setComputerChoice(computerChoice);
            setairound(airound +1);
            updateQTable("win");
          } else {
            setWinner("no one");
            setGamesRemaining(gamesRemaining -1);
            setComputerChoice(computerChoice);
            updateQTable("draw");
           
           
          }
          // console.log(gamesRemaining);
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
          alert("player win");
          updateCoinsAndXp(champdata.data.price , 20, true);
          navigate('/RPS-Game');
          window.location.reload();
        } else if ( airound > round) {
          setWinner("Computer");
          updateCoinsAndXp(champdata.data.price , 10, false);
          // navigate('/RPS-Game');
          window.location.reload();
          navigate('/gameover');
        }else {
          alert("try agian");
          navigate('/RPS-Game');
          window.location.reload();
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
     <div className='all'>
      
    <div className='playing container'>
      
       
     <div className='players'>
     <div>
     <h1 className='computer'>Computer</h1>
    
     </div>
     <div>
     <h1 className='playername'>{auth.name}</h1>
        {gesture && (<h3 className='yourgesture'>Your gesture : <span className='text-info'>{gesture}</span></h3>)}
     </div>
     </div>
     
    <Webcam
        ref={webcamRef}
        mirrored={true}
        className='camera'
  
        />
        <canvas
        ref={canvasRef}
        className='canvas'
        
          
       
        />
        
        {gesture && handDetected && (
        <div>
            {computerChoice && <p style={{ color: "white" ,fontFamily:"Jersey 10 Charted, sans-serif" }}> <img src={computerChoice} alt="Computer choice" className='computer-player'></img></p>}
        </div>
        )}
                {gesture && (<>{winner && <h1 className='winnertext' style={{ color: "white"  }}> <span className='text-info'>{winner}</span> wins ...!</h1>}</>)}
                
    </div>
    </div>
   
    :
    <LoadingPage />
    
    
    
  )
}

export default RPSGame;
