import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh, Vector3 } from "three";
import { useEffect, useRef, useState } from "react";

export function Extratime(props) {
    const speed = props.speed
    const time = useRef(0)
    const getInitialPosition = () => {
        let v = [0, 0, 0]
        let num = Math.floor(Math.random() * 3)
        v[num] = 1
        if (v[0] === 1) {
            return new Vector3(2, 1, 10)
        } else if (v[1] === 1) {
            return new Vector3(0, 1, 10)
        } else if (v[2] === 1) {
            return new Vector3(-2, 1, 10)
        }
    }
    const [position, setPosition] = useState(getInitialPosition())
    function resetPosition() {
        let v = [0, 0, 0]
        let num = Math.floor(Math.random() * 3)
        v[num] = 1
        if (v[0] === 1) {
            setPosition(new Vector3(2, 1, 10))
        } else if (v[1] === 1) {
            setPosition(new Vector3(0, 1, 10))
        } else if (v[2] === 1) {
            setPosition(new Vector3(-2, 1, 10))
        }
    }
    const glb = useLoader(
        GLTFLoader,
        process.env.PUBLIC_URL + "models/extratime/extratime_pickup_coin.glb"
    );
    useEffect(() => {
        glb.scene.scale.set(0.25, 0.25, 0.25);
        glb.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
                object.material.color.setRGB(0,1,0);
            }
        })
    }, [glb])
    useFrame((state, delta) => {
        time.current += speed   // 1.5 =>
        let newZ = position.z - (time.current)
        if (newZ < 0 && newZ > -0.8 && position.x === props.planePosition.x) { // if the plane take the coin
            resetPosition();
            time.current = 0;
            props.setTime(props.time +10 );
            props.setCount(props.count +1 );

        }
        if (newZ < -5) {
            resetPosition();
            time.current = 0;
        }
        glb.scene.position.set(position.x, position.y, newZ)
        props.setCoinX(position.x)
        glb.scene.rotation.y += delta * 5;
    }, [position])
    return <primitive object={glb.scene} />
}
