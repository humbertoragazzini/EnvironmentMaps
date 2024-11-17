import { useFrame, useThree } from "@react-three/fiber";
import {
  Environment,
  EnvironmentMap,
  Lightformer,
  OrbitControls,
  SoftShadows,
  useHelper,
} from "@react-three/drei";
import { useLayoutEffect, useRef } from "react";
import { Perf } from "r3f-perf";
import * as THREE from "three";

export default function Experience() {
  const cube = useRef();
  const ringRef = useRef();
  const directionalLightRef = useRef();
  useHelper(directionalLightRef, THREE.DirectionalLightHelper, 1);
  const scene = useThree((state) => state.scene);

  useFrame((state, delta) => {
    cube.current.rotation.y += delta * 0.2;
  });

  useFrame((delta, state) => {
    if (ringRef.current) {
      console.log(ringRef.current);
      ringRef.current.rotation.y += 0.001;
      ringRef.current.rotation.z += 0.001;
    }
  });

  return (
    <>
      <Environment resolution={2048} background frames={Infinity}>
        <color args={["black"]} attach="background"></color>
        <group ref={ringRef}>
          <mesh position={[0, 0, -2]}>
            <torusGeometry args={[30, 0.5, 50]}></torusGeometry>
            <meshBasicMaterial color={"white"}></meshBasicMaterial>
          </mesh>
        </group>
      </Environment>
      <SoftShadows></SoftShadows>

      <Perf position="top-left" />

      <OrbitControls makeDefault />

      <directionalLight
        ref={directionalLightRef}
        position={[1, 2, 3]}
        intensity={1.5}
        shadow-mapSize={[1024, 1024]}
        shadow-camera-near={0.5}
        shadow-camera-far={20}
        shadow-camera-top={10}
        shadow-camera-right={10}
        shadow-camera-bottom={-10}
        shadow-camera-left={-10}
        castShadow
      />
      <ambientLight intensity={1.5} />

      <mesh position-x={-2} castShadow>
        <sphereGeometry />
        <meshStandardMaterial color="orange" roughness={0.1} metalness={0.85} />
      </mesh>

      <mesh ref={cube} position-x={2} scale={1.5} castShadow>
        <boxGeometry />
        <meshStandardMaterial
          color="mediumpurple"
          roughness={0.1}
          metalness={0.85}
        />
      </mesh>

      <mesh
        position-y={-1}
        rotation-x={-Math.PI * 0.5}
        scale={10}
        receiveShadow
      >
        <planeGeometry />
        <meshStandardMaterial
          color="greenyellow"
          roughness={0.1}
          metalness={0.85}
        />
      </mesh>
    </>
  );
}
