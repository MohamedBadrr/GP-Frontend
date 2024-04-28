/** @format */

import { useFrame, useLoader } from "@react-three/fiber";
import { useEffect } from "react";
import { RepeatWrapping, TextureLoader } from "three";

export function FloatingGrid() {
    const diffuse = useLoader(
        TextureLoader,
        process.env.PUBLIC_URL + "textures/Untitled-1.png"
    );
    useEffect(() => {
        diffuse.wrapS = RepeatWrapping;
        diffuse.wrapT = RepeatWrapping;
        diffuse.anisotropy = 4;
        diffuse.repeat.set(1, 1);
        diffuse.offset.set(0, 0);
    }, [diffuse]);
    useFrame((state, delta) => {
        let t = -state.clock.getElapsedTime() * 0.128;
        diffuse.offset.set(0, t);
    });
    return (
        <>
        <mesh
            rotation-x={-1.56}
            receiveShadow
            scale={[0.15, 0.7, 5]}
            position={[0, 0.1, 3]}>
            <planeGeometry args={[35, 35]} />
            <meshBasicMaterial
            color={[1, 1, 1]}
            opacity={0.5}
            map={diffuse}
            alphaMap={diffuse}
            transparent={true}
            />
        </mesh>
        </>
        );
}
