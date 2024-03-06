// replace this component with rock component

// save rock position 


import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh, Vector3 } from "three";
import { useEffect, useRef, useState } from "react";


export function Coins(props) {
    const time =useRef(0)
    const getInitialPosition = ()=>{
            let v = [0,0,0]
            let num = Math.floor(Math.random() * 3)
            v[num] = 1
            if (v[0]===1 ) {
                return new Vector3(2,1,10)
            } else if (v[1]===1) {
                return new Vector3(0,1,10)
            }else if (v[2]===1) {
                return new Vector3(-2,1,10)
            }
        }
    const [position , setPosition ] = useState(getInitialPosition())
        function resetPosition(){
            let v = [0,0,0]
            let num = Math.floor(Math.random() * 3)
            v[num] = 1
            if (v[0]===1) {
                setPosition(new Vector3(2,1,10))
            } else if (v[1]===1) {
                setPosition(new Vector3(0,1,10))
            }else if (v[2]===1) {
                setPosition(new Vector3(-2,1,10))
            }
        }
    const glb = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/coins/coin.glb"
    );
    useEffect(()=>{
        glb.scene.scale.set(0.03, 0.03, 0.03);
        glb.scene.traverse((object) => {
            if (object instanceof Mesh ) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        })
        },[glb])


    useFrame((state,delta)=>{
        if (position.x === props.rockX) {
            resetPosition()
        }else{
            time.current += delta * 5 // 1.5 =>
            let newZ = position.z - (time.current)
            if (newZ < 0 && newZ > -0.8 && position.x === props.planePosition.x   ) { // if the plane take the coin
                resetPosition();
                time.current = 0
                // props.setScore(props.score + 1)
            }
            
            if (newZ < -5) {
                resetPosition();
                time.current = 0
            }
            glb.scene.position.set( position.x, position.y , newZ )
            glb.scene.rotation.y += delta * 5;
        }

    } , [position])

    return <primitive object={glb.scene} />
}
