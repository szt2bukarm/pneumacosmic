"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import styles from './loader.module.scss';
import { useStore } from '@/app/useStore';
import { useEnvironment, useGLTF } from '@react-three/drei';
import { useGSAP } from '@gsap/react';
import Exhibition2Render from './Exhibition-2/Exhibition2Render';

const assets = [
  "images/bennszorult.webp",
  "images/paroslab.webp",
  "images/saroslab.webp",
  "images/lelegzofal.webp",
  "images/fal.webp",
  "images/akusztikus.webp",
  "logo.svg",
  "footerbanner.svg"
];

const assetsAfterLoaded = Array.from({ length: 64 }, (_, i) =>
  `images/exhibition-3/walk/${i + 1}walk.webp`
);

export default function Loader() {
  const { setLoaded, loaded } = useStore();
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const [hideLoader, setHideLoader] = useState(false);
  const [domReady, setDomReady] = useState(false);
  const { setIsMobile,isMobile } = useStore();

  useEffect(() => {
    if (isMobile == null) return;
    if (!isMobile) {
    useGLTF.preload('3dc.glb');
    useEnvironment.preload({ files: 'black.exr' });
    const video = document.createElement('video');
    video.src = 'video.mp4';
    video.load();
    }

    const onDOMContentLoaded = () => setDomReady(true);
    if (document.readyState === "complete" || document.readyState === "interactive") {
      setDomReady(true);
    } else {
      window.addEventListener("DOMContentLoaded", onDOMContentLoaded);
    }
    return () => window.removeEventListener("DOMContentLoaded", onDOMContentLoaded);
  }, [isMobile]);

  const preloadAssets = (urls: string[]) =>
    new Promise<void>((resolve) => {
      let loadedCount = 0;
      const total = urls.length;

      urls.forEach((url) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          loadedCount++;
          const prog = (loadedCount / total) * 100;
          setProgress(prog);
          progressRef.current = prog;
          if (loadedCount >= total) resolve();
        };
        img.src = url;
      });
    });

  useEffect(() => {
    if (isMobile == null) return;
    const loadAll = async () => {
      try {
        await preloadAssets(assets);
        setLoaded(true);
      } catch (e) {
        console.error("Asset preload error:", e);
      }
    };
    loadAll();
  }, [isMobile]);

  useEffect(() => {
    if (loaded && domReady) setHideLoader(true);
  }, [loaded, domReady]);

  useGSAP(() => {
    if (!hideLoader) return;
  
    gsap.to('[data-gsap="loader"]', {
      opacity: 0,
      duration: 1,
      delay: 0.75,
    });
  }, [hideLoader]);

  return (
    <div
      data-gsap="loader"
      className="pointer-events-none fixed top-0 left-0 w-screen h-screen bg-black z-[9999] flex items-center justify-center"
    >
      <p className="text-white text-h1">{loaded ? "loaded" : "loading"}</p>

    </div>
  );
}
