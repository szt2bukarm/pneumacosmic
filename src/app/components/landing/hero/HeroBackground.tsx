"use client";
import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

function AuroraPlane() {
  const meshRef = useRef<any>();
  const { size } = useThree();

  // vertex shader
  const vertexShader = `
    precision highp float;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 1.0);
    }
  `;

  // fragment shader
  const fragmentShader = `
    precision highp float;
    varying vec2 vUv;
    uniform float iTime;
    uniform vec2 iResolution;

    float hash(float n) { return fract(sin(n) * 43758.5453); }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f*f*(3.0 - 2.0*f);
      float a = hash(i.x + hash(i.y));
      float b = hash(i.x + 1.0 + hash(i.y));
      float c = hash(i.x + hash(i.y + 1.0));
      float d = hash(i.x + 1.0 + hash(i.y + 1.0));
      return mix(mix(a,b,u.x), mix(c,d,u.x), u.y);
    }

    vec3 auroraLayer(vec2 uv, float speed, float intensity, vec3 color) {
      float t = iTime * speed;
      vec2 p = uv * 2.0 + t * vec2(1.0, -2.0);
      float n = noise(p + noise(p + t));
      float aurora = n - uv.y * 0.6;
      return color * aurora * intensity;
    }

    void main() {
      vec2 uv = vUv;
      uv.x *= iResolution.x / iResolution.y;

      vec3 color = vec3(0.157);

      color += auroraLayer(uv, 0.05, 0.3, vec3(0.2, 0.8, 1.0));
      color += auroraLayer(uv, 0.10, 0.4, vec3(0.6, 0.3, 1.0));
      color += auroraLayer(uv, 0.15, 0.3, vec3(0.1, 1.0, 0.5));
      color += auroraLayer(uv, 0.07, 0.2, vec3(1.0, 0.4, 0.2));

      gl_FragColor = vec4(clamp(color, 0.0, 1.0), 1.0);
    }
  `;

  // stable uniforms (create once)
  const uniforms = useMemo(() => ({
    iTime: { value: 0 },
    iResolution: { value: new THREE.Vector2(size.width, size.height) },
  }), []);

  // update each frame
  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const mat = meshRef.current.material;
    mat.uniforms.iTime.value = clock.getElapsedTime();
    mat.uniforms.iResolution.value.set(size.width, size.height);
  });

  // fullscreen triangle geometry
  const geometry = useMemo(() => {
    const geo = new THREE.BufferGeometry();
    const vertices = new Float32Array([
      -1, -1, 0,
       3, -1, 0,
      -1,  3, 0,
    ]);
    geo.setAttribute("position", new THREE.BufferAttribute(vertices, 3));
    const uvs = new Float32Array([0, 0, 2, 0, 0, 2]);
    geo.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
    return geo;
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry} frustumCulled={false}>
      <shaderMaterial
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        depthWrite={false}
        depthTest={false}
      />
    </mesh>
  );
}

export default function HeroBackground() {

    useGSAP(() => {
        const ctx = gsap.context(() => {
            gsap.set('[data-gsap="hero-bg"]', {
                opacity: 0.001,
            })
            gsap.to('[data-gsap="hero-bg"]', {
                opacity: 0.3,
                duration: 10,
                delay: 1.75,
                ease: "power4.out"
            })
        })
    })

  return (
    <div 
    data-gsap="hero-bg"
    style={{
      width: "100vw",
      height: "100vh",
      zIndex: 0,
      filter: "saturate(0)",
      opacity: 0.5,
      willChange: "opacity"
    }}>
      <Canvas gl={{ antialias: true }} dpr={[0.025, 0.025]}>
        <AuroraPlane />
      </Canvas>
    </div>
  );
}
