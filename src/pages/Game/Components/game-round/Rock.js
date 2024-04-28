import { useFrame, useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Mesh, Vector3 } from "three";
import { useEffect, useRef, useState } from "react";

export function Rock(props) {
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
        process.env.PUBLIC_URL + "models/rock/rock.glb"
    );
    useEffect(() => {
        glb.scene.scale.set(0.0015, 0.0015, 0.0015);
        glb.scene.traverse((object) => {
            if (object instanceof Mesh) {
                object.castShadow = true;
                object.receiveShadow = true;
                object.material.envMapIntensity = 20;
            }
        })
    }, [glb])
    useFrame((state, delta) => {
        if (position.x === props.coinX) {
            resetPosition();
            time.current = 0
        } else {
            time.current += speed // 1.5 =>
            let newZ = position.z - (time.current)
            if (newZ < 0 && newZ > -0.2 && position.x === props.planePosition.x && position.y === props.planePosition.y) { // if the plane take the coin
                resetPosition();
                time.current = 0
                props.setLives(props.lives - 1)
            }
            if (newZ < -5) {
                resetPosition();
                time.current = 0
            }
            glb.scene.position.set(position.x, position.y, newZ)
            props.setRockX(position.x)
            glb.scene.rotation.y += delta * 5;
        }
    }, [position])
    return <primitive object={glb.scene} />
}
