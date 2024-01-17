
import React , { Suspense, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import "./style.css";
import { CubeCamera, Environment, OrbitControls, PerspectiveCamera, Plane, useTexture } from '@react-three/drei'
import {
  EffectComposer,
  DepthOfField,
  Bloom,
  ChromaticAberration,
} 
from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import { Ground } from './Ground';
import { SpaceShip } from './SpaceShip';
import { Rings } from './Rings';
import { Boxes } from './Boxes';
import { FloatingGrid } from './FloatingGrid';
import { Coins } from './Coins';
import { Vector3 } from 'three';
import { Text } from '@react-three/drei';
import { Html} from '@react-three/drei';
// import { FaPlane } from 'react-icons/fa';
import { FaHelicopter } from "react-icons/fa";
import { TbHelicopter } from "react-icons/tb";
import { GiHelicopter } from "react-icons/gi";
import { LiaHelicopterSolid } from "react-icons/lia";


export function CarShow(props){

  const [planePosition, setPlanePosition ]= useState(new Vector3(0,1,0))
  const [score ,setScore] = useState(0)
  const [heighscore ,setHeighscore] = useState(0)
  const [skin , setSkin]=useState({
    plane:props.skin,
    positionPlane:new Vector3(0,1,0),
    scalePlane:new Vector3(1,1,1),
  });
  
  const planeImage = useTexture(process.env.PUBLIC_URL+"textures/plane3.png");

  // useLoader(TextureLoader,[
  //   process.env.PUBLIC_URL + "textures/terrain-roughness.jpg" ,

  const updateSkin3=()=>{
    setSkin({...skin ,plane:"models/plane5/skin5.glb"
    ,positionPlane:new Vector3(0,.8,0),
    scalePlane:new Vector3(.025,.025,.025)});
  }
  const updateSkin2=()=>{
    setSkin({...skin , plane:"models/plane2/skin2.glb",
    positionPlane:new Vector3(0,1,0),
    scalePlane:new Vector3(.2,.2,.2),});
  }
  const updateSkin1=()=>{ 
    setSkin({...skin ,plane:"models/plane1/ssss.glb",
    positionPlane:new Vector3(0,1,0),
    scalePlane:new Vector3(1,1,1),});
  }
  return (
    <>
    <Text
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
      </Text>
      <Text
        position={[3.80, 2.37, 0]}
        fontSize={.15}
        font="bold 30px Arial"
        intensity={50}
        color="white"
        anchorX="center"
        anchorY="middle"
        rotation={[Math.PI / 85,9.4, 0]}
      > 
        Player Name : 
      </Text>
      <Text
        position={[3.25, 2.37, 0]}
        fontSize={.15}
        font="bold 30px Arial"
        intensity={50}
        color="red"
        anchorX="center"
        anchorY="middle"
        rotation={[Math.PI / 85,9.4, 0]}
      > 
      </Text>
      <Text
        position={[3.87, 2.17, 0]}
        fontSize={.15}
        font="bold 30px Arial"
        intensity={50}
        color="white"
        anchorX="center"
        anchorY="middle"
        rotation={[Math.PI / 85,9.4, 0]}
      > 
        Heigh Score :
      </Text>
      <Text
        position={[3.30, 2.17, 0]}
        fontSize={.15}
        font="bold 30px Arial"
        intensity={50}
        color="red"
        anchorX="center"
        anchorY="middle"
        rotation={[Math.PI / 85,9.4, 0]}
      > 
        {score}
      </Text>

      <Plane args={[.3, .3]} rotation={[0,Math.PI, 0]} position={[-5.2, 2.4, 1]} >
        <meshBasicMaterial attach="material" map={planeImage} style={{
            padding: '10px',
            border: '2px solid white', // Border color
            borderRadius: '50px', // Border radius
            // boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)', // Box shadow
          }}  />
      </Plane>
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

    
      <Html position={[.55, 2.28 , 0]} >
        <FaHelicopter onClick={updateSkin2}  style={{ color: 'blue', fontSize: '2em',cursor:'pointer' }}  />
      </Html>
      <Html position={[.1, 2.31 , 0]}>
        <GiHelicopter onClick={updateSkin3} style={{ color: 'blue', fontSize: '3em', cursor:'pointer' }}  />
      </Html>
      <Html position={[-.4, 2.31 , 0]}>
        <LiaHelicopterSolid onClick={updateSkin1} style={{ color: 'blue', fontSize: '3em', cursor:'pointer' }}  />
      </Html>

    <OrbitControls target={[0, 0.35, 0]} maxPolarAngle={1.45} enablePan={false} enableZoom={false} enableRotate={false}/>
    <PerspectiveCamera makeDefault fov={60} position={[0, 2, -4]}  />

    <color args={[0,0,0]} attach="background" />

    <CubeCamera resolution={256} frames={Infinity}>
      {
        (texture)=>(
          <>
          <Environment map={texture} />
              <SpaceShip planePosition={planePosition} setPlanePosition={setPlanePosition} skin={skin}/>
              <Ground />
          </>
        )
      }
    </CubeCamera>

    <Coins planePosition={planePosition} score={score} setScore={setScore}/>
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
          blendFunction={BlendFunction.NORMAL} // blend mode
          // offset={[0.0005, 0.0012]} // color offset
        />
      </EffectComposer> */}


    <mesh>
      <planeGeometry args={[30 ,30]} />   
      <meshBasicMaterial color={"red"} />
      
    </mesh>

    </>
  );
}

function Game() { 
  const defaultSkin = "models/plane1/ssss.glb";
  return (
    <Suspense fallback={null}>
      <Canvas shadows>
        <CarShow skin={defaultSkin}/>
      </Canvas>
    </Suspense>
  );
}

export default Game;