"use client";
import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { useStore } from "@/app/useStore";

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

export default function ImprintBackground() {
  const [carouselIndex, setCarouselIndex] = useState(0)
  const imagesRef = useRef<HTMLImageElement[]>([])
  const tweenRef = useRef<gsap.core.Tween | null>(null)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)
  const [allowTimeout, setAllowTimeout] = useState<boolean>(true)
  const {isMobile} = useStore();

      useGSAP(() => {

        if (!imagesRef.current) return
        if (tweenRef.current) tweenRef.current.kill()
            
            imagesRef.current.forEach((img, i) => {
                if (i !== carouselIndex) gsap.to(img, { opacity: 0, duration: 0.3,scale: 1.05, filter: "blur(15px)", ease: "power1.out" })
                })

            
            gsap.set(imagesRef.current[carouselIndex],{ opacity: 0, y: -50 })
            tweenRef.current = gsap.to(imagesRef.current[carouselIndex],  {
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 1,
                ease: "power2.out",
            })
    },[carouselIndex,imagesRef.current])

    useEffect(() => {
        if (!allowTimeout) {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current)
                timeoutRef.current = null
            }
            return
        }

        if (timeoutRef.current) clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(() => {
            setCarouselIndex((prev) => {
                if (prev === 5) return 0
                return prev + 1
            })
        }, 5000)
    },[carouselIndex,allowTimeout])



  return (
  <div data-gsap="imprint-bg-wrapper" className="sticky top-0 w-screen h-screen opacity-50">
    <div className="relative w-full h-full overflow-hidden">
    <div data-gsap="imprint-bgimage" className="absolute top-0 left-0 w-screen h-screen !z-[5] opacity-75">
        <img ref={el => {imagesRef.current[0] = el}} src="images/saroslab.webp" className="absolute top-0 left-0 w-full h-[110vh] object-cover" />
        <img ref={el => {imagesRef.current[1] = el}} src="images/fal.webp" className="absolute top-0 left-0 w-full h-[110vh] object-cover" />
        <img ref={el => {imagesRef.current[2] = el}} src="images/bennszorult.webp" className="absolute top-0 left-0 w-full h-[110vh] object-cover" />
        <img ref={el => {imagesRef.current[3] = el}} src="images/paroslab.webp" className="absolute top-0 left-0 w-full h-[110vh] object-cover" />
        <img ref={el => {imagesRef.current[4] = el}} src="images/lelegzofal.webp" className="absolute top-0 left-0 w-full h-[110vh] object-cover" />
        <img ref={el => {imagesRef.current[5] = el}} src="images/akusztikus.webp" className="absolute top-0 left-0 w-full h-[110vh] object-cover" />
    </div>
    {!isMobile && (
  <div
  data-gsap="imprint-bg"
  className="absolute top-0 left-0 w-screen h-screen z-[10]"
  style={{
    filter: "saturate(0) brightness(0.5)",
    opacity: 1,
    willChange: "opacity",
    WebkitMaskImage:
      "linear-gradient(-135deg, black 5%, transparent 30%, transparent 25%, transparent 35%, black 65%, black 100%)",
    WebkitMaskRepeat: "no-repeat",
    WebkitMaskSize: "cover",
    maskImage:
      "linear-gradient(-135deg, black 5%, transparent 30%, transparent 25%, transparent 35%, black 65%, black 100%)",
    maskRepeat: "no-repeat",
    maskSize: "cover",
  }}
>
    <div className="w-screen h-screen z-[10]">
    <Canvas gl={{ antialias: true }} dpr={[0.5, 1.5]}>
      <AuroraPlane />
    </Canvas>
    </div>
  </div>
    )}
  </div>
</div>

  );
}
