
import React , { Suspense, useEffect, useState , useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import "./style.css";
import { CubeCamera, Environment, OrbitControls, Preload, PerspectiveCamera, useTexture } from '@react-three/drei'
import  CanvasLoader from "./Loader"
import  * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";


// from "@react-three/postprocessing";
import { useSearchParams } from "react-router-dom"

// import { BlendFunction } from "postprocessing";
import { Ground } from './Ground';
import { SpaceShip } from './SpaceShip';
import { Rings } from './Rings';
import { FloatingGrid } from './FloatingGrid';
import { Coins } from './Coins';
import { Vector3 } from 'three';
import { Text } from '@react-three/drei';
import rock from "../../../img/pngwing.com.png"
import { Rock } from './Rock';
import axios from 'axios';
// import { HeartGeometry } from 'three/examples/jsm/geometries/HeartGeometry';

// import { Html} from '@react-three/drei';
// import { FaPlane } from 'react-icons/fa';
// import { FaHelicopter } from "react-icons/fa";
// import { TbHelicopter } from "react-icons/tb";
// import { GiHelicopter } from "react-icons/gi";
// import { LiaHelicopterSolid } from "react-icons/lia";



export function CarShow(props){
  return (
    <>
    {/* <Text
        position={[.009, 2.35, 0]}
        fontSize={.2}
        font="bold 45px Arial"
        intensity={15}
        color="white"
        anchorX="center"
        anchorY="middle"
        rotation={[Math.PI / 85,9.4, 0]}
      > 
        Your Score : {score}
      </Text> */}
      <Text
        position={[3.8, 2.37, 0]}
        fontSize={.15}
        font="bold 30px Arial"
        intensity={50}
        color="white"
        anchorX="center"
        anchorY="middle"
        rotation={[Math.PI / 85,9.4, 0]}
      > 
        Lives : 
      </Text>
      
      <mesh position={[0, 0, 0]}>
        <meshStandardMaterial color="red" />
        </mesh>
      {/* <Text
        position={[3.6, 2.17, 0]}
        fontSize={.15}
        font="bold 30px Arial"
        intensity={50}
        color="white"
        anchorX="center"
        anchorY="middle"
        rotation={[Math.PI / 85,9.4, 0]}
      > 
        Heigh Score :
      </Text> */}
      {/* <Text
        position={[3, 2.17, 0]}
        fontSize={.15}
        font="bold 30px Arial"
        intensity={50}
        color="red"
        anchorX="center"
        anchorY="middle"
        rotation={[Math.PI / 85,9.4, 0]}
      > 
        {score}
      </Text> */}
      
      {/* <Html>
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            padding: '10px',
            border: '2px solid #3498db', // Border color
            borderRadius: '10px', // Border radius
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Box shadow
          }}
        >
          <img
            src={imgTst}
            alt="Some description"
            style={{ width: '100%', height: '100%', borderRadius: '8px' }} // Adjust image styling
          />
        </div>
      </Html> */}

    

    {/* enablePan={false} */}
    <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} enableZoom={false} enableRotate={false} />
    <PerspectiveCamera makeDefault fov={60} position={[0, 2, -4]}  />

    <color args={[0,0,0]} attach="background" />

    <CubeCamera resolution={256} frames={Infinity}>
      {
        (texture)=>(
          <>
          <Environment map={texture} />
              <SpaceShip planePosition={props.planePosition} setPlanePosition={props.setPlanePosition} skin={props.skin} action={props.action} />
              <Ground />
              
          </>
        )
      }
    </CubeCamera>
    
    { (props.round.start && !props.round.finish) &&
      <>
      <Rock planePosition={props.planePosition} />
      <Coins planePosition={props.planePosition} />
      </>
    }
    <spotLight 
        color={[1, 0.25, 0.7]}
        intensity={100}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
    />

    <spotLight 
      color={[0.14, 0.5, 1]}
        intensity={100}
        angle={0.6}
        penumbra={0.5}
        position={[-5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
    />

      <Rings />
      {/* <Boxes /> */}
      <FloatingGrid />

    <mesh>
      <planeGeometry args={[30 ,30]} />   
      <meshBasicMaterial color={"red"} />
    </mesh>

    </>
  );
}

function Game(props) { 
  const [queryParameters] = useSearchParams();
    const id = queryParameters.get("id")
    const skins = [{
      url:"models/plane1/skin.glb",
      positionPlane:new Vector3(0,1,0),
      scalePlane:new Vector3(1,1,1),
    },
    {
      url:"models/plane2/skin.glb",
      positionPlane:new Vector3(0,1,0),
      scalePlane:new Vector3(.2,.2,.2),
    },
    {
      url:"models/plane5/skin.glb",
      positionPlane:new Vector3(0,1,0),
      scalePlane:new Vector3(.025,.025,.025),
    },]
    const [planePosition , setPlanePosition ]= useState(new Vector3(0,1,0))
    
    
    // rock positions
    const positions = [
      new Vector3(2,1,10),
      new Vector3(0,1,10),
      new Vector3(-2,1,10)
    ]    

    const [round , setRound] = useState({
      time : 1.5,
      RequireCoins : 20,
      start: false,
      finish : false,
    }) 
    const [score ,setScore] = useState(0)

    const webcamRef = useRef(null);
    const canvasRef = useRef(null);
    const [action , setAction ] = useState()

  const runHandpose = async () => {
    const modelUrl = "D:/GP/Real GP/GP-Frontend/src/handpose/manifest.json"
    const net = await handpose.load(modelUrl);
    console.log("Handpose model loaded.");
    setRound({round , start:true })
    //  Loop and detect hands
    setInterval(() => {
      detect(net);
    }, 500);
  };
  

  const detect = async (net) => {
    // Check data is available
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      // Get Video Properties
      const video = webcamRef.current.video;
      const videoWidth = webcamRef.current.video.videoWidth;
      const videoHeight = webcamRef.current.video.videoHeight;
      // // Set video width
      webcamRef.current.video.width = 300;
      webcamRef.current.video.height = 300;

      // Make Detections
      const hand = await net.estimateHands(video);
      if (hand.length > 0) {
          // console.log(hand[0].landmarks[8][0]);
          setAction(hand[0].landmarks[8][0])
      }
    }
  };
  useEffect(() => {
    runHandpose();
  }, [])
  
  
  return (
    <>

        

        
      <Canvas shadows>
        <Suspense fallback={<CanvasLoader />}>
          <CarShow skin={skins[id]} round={round} setAction={setAction} action={action} setRound={setRound} planePosition={planePosition} setPlanePosition={setPlanePosition} />
          <Preload all /> 
        </Suspense>
      </Canvas>
      <Webcam
          ref={webcamRef}
          mirrored={true}
          style={{
            position: "absolute",
            marginLeft: "auto",
            top : 0,
            left: 0,
            right: 0,
            textAlign: "center",
            zindex: 9,
            
          }}
        />
    </>
  );
}

export default Game;