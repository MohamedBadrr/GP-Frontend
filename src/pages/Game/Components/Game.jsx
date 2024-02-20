
import React , { Suspense, useEffect, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import "./style.css";
import { CubeCamera, Environment, OrbitControls, Preload, PerspectiveCamera, useTexture } from '@react-three/drei'
import  CanvasLoader from "./Loader"

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
      
      {/* <HeartGeometry */}
      <mesh position={[0, 0, 0]}>
        {/* <HeartGeometry args={[0.5]} /> */}
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
              <SpaceShip planePosition={props.planePosition} setPlanePosition={props.setPlanePosition} skin={props.skin} setAction={props.setAction}/>
              <Ground />
          </>
        )
      }
    </CubeCamera>

    {/* <Coins planePosition={planePosition} score={score} setScore={setScore} />
    <spotLight 
        color={[1, 0.25, 0.7]}
        intensity={100}
        angle={0.6}
        penumbra={0.5}
        position={[5, 5, 0]}
        castShadow
        shadow-bias={-0.0001}
    /> */}




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

         {/* <DepthOfField focusDistance={0.0035} focalLength={0.01} bokehScale={3} height={480} />  */}
      {/* <EffectComposer>
        <Bloom
          blendFunction={BlendFunction.ADD}
          intensity={0.3} // The bloom intensity.
          width={300} // render width
          height={300} // render height
          kernelSize={5} // blur kernel size
          luminanceThreshold={0.15} // luminance threshold. Raise this value to mask out darker elements in the scene.
          luminanceSmoothing={0.025} // smoothness of the luminance threshold. Range is [0, 1]
        /> 
        <ChromaticAberration
          // blendFunction={BlendFunction.NORMAL} // blend mode
          // offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer>  */}


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
    const [selected , setSelected ] = useState(false)

    // const [rockId , setRockId ] = useState(1)

    const handleSelect = ()=>{
      setSelected(true)
    }
    const [planePosition , setPlanePosition ]= useState(new Vector3(0,1,0))


    // rock positions
    const positions = [
      new Vector3(2,1,10),
      new Vector3(0,1,10),
      new Vector3(-2,1,10)
    ]
    const [rockPosition , setRockPosition ] = useState(null)
    // move / action 
    const [ action , setAction ] = useState({
      pastPosition : null,
      name : ""
    })

    const [score ,setScore] = useState(0)
    
    const BackFun = ()=>{
      axios.post("http://localhost:4000/training/traning-data",{
        plane_position: action.pastPosition ,
        rock_position: rockPosition,
        action: action.name ,
      }).then((resp) =>{
        console.log(resp.data);
      }).catch((err)=>{
        console.log(err);
      });
    }
    
    useEffect(()=>{
      BackFun()
    },[ action , rockPosition , action.pastPosition   ])
  
  return (
    <>
      <Canvas shadows>
        <Suspense fallback={<CanvasLoader />}>
          <CarShow skin={skins[id]}  planePosition={planePosition} setPlanePosition={setPlanePosition} setAction={setAction} action = {action}/>
          {
            (rockPosition != null ) ? 
            <Rock planePosition={planePosition} rockPosition={rockPosition} setRockPosition={setRockPosition} score={score} setScore={setScore} />
            : ""
          }
          <Preload all /> 
        </Suspense>
      </Canvas>
      
      <div className='rocks-box' onClick={()=>{setSelected(!selected)}} >
      <div className='rock-card' onClick={handleSelect}>
        <img src={rock} alt='rock' className='mt-3 w-100'/>
      </div>
    </div>
    
    {
      (selected) && <div className='rock-places' >
          <div className='text-center small-rock rock-1' onClick={()=>{
            setRockPosition( positions[0] )
            setSelected(false);
            }} >
              <img src={rock} alt='rock' className='w-75  ' />
            </div>
          <div className='text-center small-rock' onClick={()=>{
            setRockPosition(positions[1]);
            setSelected(false);
          }}>
            <img src={rock} alt='rock' className='w-75 ' />
          </div>
          <div className='text-center small-rock' onClick={()=>{
            setRockPosition( positions[2] )
            setSelected(false);
          }}>
          <img src={rock} alt='rock' className='w-75  ' />
        </div>
      </div>
    }
    </>
  );
}

export default Game;