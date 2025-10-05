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
import { Suspense, useEffect, useRef, useState } from "react";
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

function Scene() {
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
      <mesh position={[0, -0.05, 0]} rotation={[-Math.PI / 2, 0, 0]}>
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
    const [target, setTarget] = useState(new THREE.Vector3(0, 0.7, 0));
    const cameraOffset = useRef(0);
  
    CustomEase.create("customEase", "M0,0 C0.12,0.65 0.35,1 1,1");
  
    // Responsive offsets
    useEffect(() => {
      const handleTarget = () => {
        const width = window.innerWidth;
  
        if (width < 550) {
          cameraOffset.current = 20;
          setTarget(new THREE.Vector3(0, 1.85, 0));
        } else if (width < 768) {
          cameraOffset.current = 10;
          setTarget(new THREE.Vector3(0, 1.8, 0));
        } else if (width < 1024) {
          cameraOffset.current = 7;
          setTarget(new THREE.Vector3(0, 1.55, 0));
        } else if (width < 1400) {
          cameraOffset.current = 5;
          setTarget(new THREE.Vector3(0, 0.9, 0));
        } else {
          cameraOffset.current = 0;
          setTarget(new THREE.Vector3(0, 0.7, 0));
        }
      };

      const handleCamera = () => {
        if (cameraRef.current) {
            gsap.to(cameraRef.current.position, {
              z: 17.5 + cameraOffset.current,
              y: 1,
              x: 0,
              duration: 0.5,
              ease: "power2.out",
            });
          }
      }

      const handleResize = () => {
        handleTarget();
        handleCamera();
      }

      handleTarget();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, []);
  
    // Entrance anim only once
    useEffect(() => {
      if (!cameraRef.current || !lenis) return;
  
      lenis.stop();
  
      gsap.fromTo(
        cameraRef.current.position,
        { x: 0, y: 25, z: 17.5 + cameraOffset.current },
        {
          x: 0,
          y: 1,
          z: 17.5 + cameraOffset.current,
          duration: 3,
          delay: 0.5,
          ease: "customEase",
          onComplete: () => {
            lenis.start();
            gsap.to(cameraRef.current.position, {
              y: -15,
              ease: "none",
              scrollTrigger: {
                trigger: "[data-gsap='canvas']",
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
      if (cameraRef.current) {
        cameraRef.current.lookAt(target);
      }
    });
  
    return (
      <PerspectiveCamera
        ref={cameraRef}
        makeDefault
        fov={24}
        position={[0, 25, 17.5 + cameraOffset.current]}
      />
    );
  }
    
export default function Exhibition2Render() {
  return (
    <Canvas
      data-gsap="canvas"
      dpr={[0.5,1.25]}
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