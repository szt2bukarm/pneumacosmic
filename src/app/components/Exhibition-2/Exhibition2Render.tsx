"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import {
  MeshReflectorMaterial,
  OrbitControls,
  useHelper,
  useVideoTexture,
  Environment,
  useGLTF,
  PerspectiveCamera,
} from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import * as THREE from "three";
import { EffectComposer, Bloom, DepthOfField } from "@react-three/postprocessing";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import CustomEase from "gsap/CustomEase";
import ScrollTrigger from "gsap/dist/ScrollTrigger";
import { useLenis } from "@studio-freight/react-lenis";
gsap.registerPlugin(ScrollTrigger, CustomEase);

interface GLBModelProps {
  path: string;
  position?: [number, number, number];
  scale?: [number, number, number];
  rotation?: [number, number, number];
  castShadow?: boolean;
  receiveShadow?: boolean;
}

function GLBModel({
  path,
  position = [0, 0, 0],
  scale = [1, 1, 1],
  rotation = [0, 0, 0],
  castShadow = true,
  receiveShadow = true,
}: GLBModelProps) {
  const gltf = useGLTF(path, true);

  gltf.scene.traverse((child: THREE.Object3D) => {
    if ((child as THREE.Mesh).isMesh) {
      const mesh = child as THREE.Mesh;
      mesh.castShadow = castShadow;
      mesh.receiveShadow = receiveShadow;
      mesh.material = new THREE.MeshStandardMaterial({
        color: new THREE.Color(0.01, 0.01, 0.01),
        metalness: 1,
        roughness: 0.1,
      });
    }
  });

  return <primitive object={gltf.scene} position={position} scale={scale} rotation={rotation} />;
}

function Scene({ cameraRef }: { cameraRef: React.RefObject<THREE.PerspectiveCamera> }) {
  const lightRef = useRef<THREE.SpotLight>(null);

  const videoTexture = useVideoTexture("video.mp4", {
    muted: true,
    loop: true,
    autoplay: true,
    crossOrigin: "anonymous",
  });

  return (
    <>
      {/* Lights & Background */}
      <ambientLight intensity={1} />
      <color attach="background" args={["#000000"]} />

      {/* Video Plane */}
      <mesh position={[0, 1.1, -8]}>
        <planeGeometry args={[6, 3.75]} />
        <meshBasicMaterial map={videoTexture} toneMapped={false} side={THREE.FrontSide} />
      </mesh>
      <mesh position={[0, 1.1, -8]}>
        <planeGeometry args={[7, 4.75]} />
        <meshBasicMaterial map={videoTexture} toneMapped={false} side={THREE.BackSide} />
      </mesh>

      {/* Spot Light */}
      <spotLight
        ref={lightRef}
        position={[0, 2, 10]}
        intensity={50}
        angle={Math.PI / 10}
        penumbra={0.5}
      />

      {/* Reflective Floor */}
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[2000, 500]}
          resolution={2048}
          mixBlur={1}
          mixStrength={550}
          roughness={1}
          color="#050505"
          metalness={0}
        />
      </mesh>
      <mesh position={[0, 0, -8.5]}>
        <planeGeometry args={[50, 50]} />
        <MeshReflectorMaterial
          blur={[300, 300]}
          resolution={1024}
          mixBlur={1}
          mixStrength={150}
          roughness={1}
          color="#050505"
          metalness={0}
        />
      </mesh>

      {/* 3D Model */}
      <GLBModel path="3d.glb" position={[0, -0.45, 0]} scale={[0.4, 0.4, 0.4]} />

      {/* Environment */}
      <Environment files="black.exr" />

      {/* Postprocessing */}
      {/* <Suspense fallback={null}>
        <EffectComposer camera={cameraRef.current}>
          <Bloom intensity={1.5} luminanceThreshold={0.2} luminanceSmoothing={0.9} />
          <DepthOfField focusDistance={0.02} focalLength={0.02} bokehScale={1} height={480} />
        </EffectComposer>
      </Suspense> */}
    </>
  );
}
function CameraAnimation() {
    const lenis = useLenis();
    const cameraRef = useRef<THREE.PerspectiveCamera>(null);
    const target = new THREE.Vector3(0, 0.7, 0); // point to look at
  
    // create the custom ease
    CustomEase.create("customEase", "M0,0 C0.12,0.65 0.35,1 1,1");
  
    useEffect(() => {
      if (!cameraRef.current || !lenis) return;
        lenis?.stop();
      // entrance animation
      gsap.fromTo(
        cameraRef.current.position,
        { x: 0, y: 25, z: 17.5 },
        {
          x: 0,
          y: 1,
          z: 17.5,
          duration: 3,
          delay: 0.5,
          ease: "customEase",
          onComplete: () => {
            lenis?.start();
            // start scroll-triggered animation after entrance
            gsap.to(cameraRef.current.position, {
              y: -15,
              ease: "none",
              scrollTrigger: {
                trigger: "[data-gsap='canvas']", // whole page
                start: "top top",
                end: "bottom top",
                scrub: true,
              },
            });
          },
        }
      );
    }, [lenis]);
  
    useFrame(() => {
      if (cameraRef.current) cameraRef.current.lookAt(target);
    });
  
    return <PerspectiveCamera ref={cameraRef} makeDefault fov={24} position={[0, 25, 17.5]} />;
  }
  
  export default function Exhibition2Render() {
    return (
      <Canvas
        data-gsap="canvas"
        gl={{
          toneMapping: THREE.ACESFilmicToneMapping,
          outputEncoding: THREE.sRGBEncoding,
        }}
      >
        <CameraAnimation />
        <Scene />
      </Canvas>
    );
  }