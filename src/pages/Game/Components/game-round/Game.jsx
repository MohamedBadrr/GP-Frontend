/** @format */

import React, { Suspense, useEffect, useState, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import {
  CubeCamera,
  Environment,
  OrbitControls,
  Preload,
  PerspectiveCamera,
} from "@react-three/drei";
import CanvasLoader from "./Loader";
import * as handpose from "@tensorflow-models/handpose";
import Webcam from "react-webcam";
import { getAuthUser, updateAuthUser } from "../../../../helper/Storage";
import { useSearchParams } from "react-router-dom";
import { Ground } from "./Ground";
import { SpaceShip } from "./SpaceShip";
import { Rings } from "./Rings";
import { FloatingGrid } from "./FloatingGrid";
import { Coins } from "./Coins";
import { Vector3 } from "three";
import { Text } from "@react-three/drei";
import { Rock } from "./Rock";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LoadingPage from "../../../LoadingPage/LoadingPage";

export function CarShow(props) {
  const navigate = useNavigate();
  const [score, setScore] = useState(0);
  const [lives, setLives] = useState(3);
  const [rockX, setRockX] = useState();
  const [coinX, setCoinX] = useState();
  const auth = getAuthUser();

  useEffect(() => {
    if (lives === 0) {
      navigate("/gameover");
    }
  }, [lives]);
  const updateCoinsAndXp = (coins, xp, win) => {
    if (auth) {
      axios
        .put(
          "http://localhost:4000/game/update-coins",
          {
            coins: win ? auth.coins + coins * 2 : auth.coins + coins,
            xp: auth.xp + xp,
            status: win ? "win" : "lose",
          },
          {
            headers: {
              token: auth.token,
            },
          }
        )
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  };
  useEffect(() => {
    if (auth) {
      axios
        .get(`http://localhost:4000/game/rounds`, {
          headers: {
            token: auth.token,
          },
        })
        .then((resp) => {
          props.setRound({
            ...props.round,
            time: resp.data.time,
            RequireCoins: resp.data.requiredCoins,
            speed: resp.data.speed,
          });
        })
        .catch((errors) => {
          console.log(errors);
        });
    }
  }, [1]);
  useEffect(() => {
    if (props.round.start) {
      setTimeout(() => {
        props.setRound({ ...props.round, time: props.round.time - 1 });
      }, 1000);
    }
  }, [props.round.time]);
  if (
    props.round.time === 0 &&
    props.round.start &&
    score >= props.round.RequireCoins
  ) {
    updateCoinsAndXp(score, 20, true);
    updateAuthUser();
    navigate("/winner");
    window.location.reload();
  } else if (props.round.time === 0 && props.round.start) {
    updateCoinsAndXp(score, 10, false);
    updateAuthUser();
    navigate("/gameover");
    window.location.reload();
  }
  return (
    <>
      <Text
        position={[0.009, 2.35, 0]}
        fontSize={0.2}
        font="bold 45px Arial"
        intensity={15}
        color="white"
        anchorX="center"
        anchorY="middle"
        rotation={[Math.PI / 85, 9.4, 0]}>
        Your Score : {score} / {props.round.RequireCoins}
      </Text>
      <Text
        position={[3.6, 2.37, 0]}
        fontSize={0.15}
        font="bold 30px Arial"
        intensity={50}
        color="white"
        anchorX="center"
        anchorY="middle"
        rotation={[Math.PI / 85, 9.4, 0]}>
        Lives : {lives}
      </Text>
      <mesh position={[0, 0, 0]}>
        <meshStandardMaterial color="red" />
      </mesh>
      <Text
        position={[3.6, 2.17, 0]}
        fontSize={0.15}
        font="bold 30px Arial"
        intensity={50}
        color="white"
        anchorX="center"
        anchorY="middle"
        rotation={[Math.PI / 85, 9.4, 0]}>
        Time left : {props.round.time}
      </Text>
      <OrbitControls
        target={[0, 0.35, 0]}
        maxPolarAngle={1.45}
        enableZoom={false}
        enableRotate={false}
      />
      <PerspectiveCamera makeDefault fov={60} position={[0, 2, -4]} />
      <color args={[0, 0, 0]} attach="background" />
      <CubeCamera resolution={256} frames={Infinity}>
        {(texture) => (
          <>
            <Environment map={texture} />
            {props.skin.finish && (
              <SpaceShip
                planePosition={props.planePosition}
                setPlanePosition={props.setPlanePosition}
                skin={props.skin.data}
                action={props.action}
              />
            )}
            <Ground />
          </>
        )}
      </CubeCamera>
      {props.round.start && !props.round.finish && (
        <>
          <Rock
            setRockX={setRockX}
            coinX={coinX}
            planePosition={props.planePosition}
            setLives={setLives}
            lives={lives}
            speed={props.round.speed}
          />
          <Coins
            rockX={rockX}
            coinX={coinX}
            setCoinX={setCoinX}
            planePosition={props.planePosition}
            setScore={setScore}
            score={score}
            speed={props.round.speed}
          />
        </>
      )}
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
        <planeGeometry args={[30, 30]} />
        <meshBasicMaterial color={"red"} />
      </mesh>
    </>
  );
}

function Game() {
  const auth = getAuthUser();
  const [queryParameters] = useSearchParams();
  const [skin, setSkin] = useState({
    loading: false,
    finish: false,
    data: null,
    errors: null,
  });
  const id = queryParameters.get("id");
  const [planePosition, setPlanePosition] = useState(new Vector3(0, 1, 0));
  const [round, setRound] = useState({
    time: null,
    RequireCoins: null,
    speed: null,
    start: false,
    finish: false,
  });

  useEffect(() => {
    if (auth) {
      setSkin({ ...skin, loading: true, err: [] });
      axios
        .get(`http://localhost:4000/skins/spacificSkins/${id}`, {
          headers: {
            token: auth.token,
          },
        })
        .then((resp) => {
          setSkin({
            ...skin,
            data: resp.data,
            loading: false,
            errors: "",
            finish: true,
          });
        })
        .catch((errors) => {
          setSkin({
            ...skin,
            loading: false,
            errors: errors.response.data.errors[0].msg,
            finish: true,
          });
        });
    }
  }, [id]);
  const webcamRef = useRef(null);
  const [action, setAction] = useState();

  const runHandpose = async () => {
    const modelUrl = "../../../../handpose/manifest.json";
    const net = await handpose.load();
    console.log("Handpose model loaded.");
    setRound({ ...round, start: true });
    setInterval(() => {
      detect(net);
    }, 500);
  };

  const detect = async (net) => {
    if (
      typeof webcamRef.current !== "undefined" &&
      webcamRef.current !== null &&
      webcamRef.current.video.readyState === 4
    ) {
      const video = webcamRef.current.video;
      webcamRef.current.video.width = 300;
      webcamRef.current.video.height = 300;
      const hand = await net.estimateHands(video);
      if (hand.length > 0) {
        setAction(hand[0].landmarks[8][0]);
      }
    }
  };
  useEffect(() => {
    runHandpose();
  }, []);

  return round.start && skin.finish ? (
    <>
      <Canvas shadows>
        <Suspense fallback={<CanvasLoader />}>
          <CarShow
            skin={skin}
            round={round}
            setAction={setAction}
            action={action}
            setRound={setRound}
            planePosition={planePosition}
            setPlanePosition={setPlanePosition}
          />
          <Preload all />
        </Suspense>
      </Canvas>
      <Webcam
        ref={webcamRef}
        mirrored={true}
        style={{
          position: "absolute",
          marginLeft: "auto",
          visibility: "hidden",
          top: 0,
          left: 0,
          right: 0,
          textAlign: "center",
          zindex: 9,
        }}
      />
    </>
  ) : (
    <LoadingPage />
  );
}

export default Game;
