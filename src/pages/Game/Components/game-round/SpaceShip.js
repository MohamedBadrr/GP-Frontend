import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect, useRef, useState } from "react";
import { Mesh } from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { Vector3 } from 'three';

export function SpaceShip(props) {
  const [pastPosition, setPastPosition] = useState([0, 0])
  function resetPastPosition() {
    setPastPosition([0, 0])
  }
  const modelUrl = props.skin.modelUrl
  const scale = props.skin.scale
  const positionPlane = props.skin.positionPlane
  const Speed = 0.2
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + modelUrl
  );
  useEffect(() => {
    gltf.scene.position.set(positionPlane.x, positionPlane.y, positionPlane.z) // (x,y,z)
    gltf.scene.scale.set(scale.x, scale.y, scale.z);
    gltf.scene.rotation.x = -0.2
    gltf.scene.traverse((object) => {
      if (object instanceof Mesh) {
        object.castShadow = false;
        object.receiveShadow = false;
        object.material.envMapIntensity = 5;
      }
    })
  }
    , [gltf])
  useEffect(() => {
    if (props.action > 214 && props.action < 427 && props.planePosition.x === -2) {
      // position => right move => left
      setPastPosition([0, 1]);
      props.setPlanePosition(new Vector3(0, 1, 0));
    } else if (props.action > 214 && props.action < 427 && props.planePosition.x === 2) {
      // position => left move => right
      setPastPosition([1, 0]);
      props.setPlanePosition(new Vector3(0, 1, 0));
    } else if (props.action > 427 && (props.planePosition.x === 0 || props.planePosition.x === -2)) {
      // position => medel move => left
      props.setPlanePosition(new Vector3(2, 1, 0));
    } else if (props.action < 214 && (props.planePosition.x === 0 || props.planePosition.x === 2)) {
      // position => medel move => right
      props.setPlanePosition(new Vector3(-2, 1, 0));
    }
  }, [props.action])
  useFrame((state, delta) => {
    if (props.planePosition.x === 2) {
      // left side
      gltf.scene.position.x += Speed;
      if (gltf.scene.position.x > 2) {
        gltf.scene.position.x = 2;
        gltf.scene.rotation.z = 0.4;
        gltf.scene.rotation.y = -0.1;
      }
    } else if (props.planePosition.x === 0 && pastPosition[0] === 1) {
      gltf.scene.position.x -= Speed;
      if (gltf.scene.position.x < 0) {
        gltf.scene.position.x = 0;
        resetPastPosition();
        gltf.scene.rotation.z = 0;
        gltf.scene.rotation.y = 0;
      }
    } else if (props.planePosition.x === 0 && pastPosition[1] === 1) {
      gltf.scene.position.x += Speed;
      if (gltf.scene.position.x > 0) {
        gltf.scene.position.x = 0;
        resetPastPosition();
        gltf.scene.rotation.z = 0;
        gltf.scene.rotation.y = 0;
      }
    } else if (props.planePosition.x === -2) {
      gltf.scene.position.x -= Speed;
      if (gltf.scene.position.x < -2) {
        gltf.scene.position.x = -2;
        gltf.scene.rotation.z = -0.4;
        gltf.scene.rotation.y = 0.1;
      }
    }
  })
  return <primitive object={gltf.scene} />
}