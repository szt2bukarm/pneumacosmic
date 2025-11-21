"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useStore } from '@/app/useStore';
import { useEnvironment, useGLTF } from '@react-three/drei';
import { useGSAP } from '@gsap/react';

const assets = [
  "/images/bennszorult.webp",
  "/images/paroslab.webp",
  "/images/saroslab.webp",
  "/images/lelegzofal.webp",
  "/images/fal.webp",
  "/images/akusztikus.webp",
  "/logo.webp",
  "/footerbanner.svg",
  ...Array.from({ length: 2 }, (_, i) => `images/exhibition-2/gallery-1/${i + 1}.webp`),
  ...Array.from({ length: 2 }, (_, i) => `images/exhibition-2/gallery-2/${i + 1}mtan.webp`),
  ...Array.from({ length: 2 }, (_, i) => `images/exhibition-2/gallery-3/${i + 1}kecskemet.webp`),
  ...Array.from({ length: 2 }, (_, i) => `images/exhibition-2/gallery-4/${i + 1}mta.webp`),
  ...Array.from({ length: 7 }, (_, i) => `images/exhibition-2/MTA/${i}.webp`),
  ...Array.from({ length: 2 }, (_, i) => `images/exhibition-3/gallery-1/${i + 1}general.webp`),
  ...Array.from({ length: 2 }, (_, i) => `images/exhibition-3/gallery-2/${i + 1}werk.webp`),
  ...Array.from({ length: 3 }, (_, i) => `images/exhibition-3/gallery-3/${i + 1}object.webp`),
  ...Array.from({ length: 3 }, (_, i) => `images/exhibition-4/gallery-1/${i + 1}kiallitas.webp`),
  ...Array.from({ length: 2 }, (_, i) => `images/exhibition-5/gallery-1/werk${i + 1}.webp`),
  ...Array.from({ length: 2 }, (_, i) => `images/exhibition-5/gallery-2/mate${i + 1}.webp`),
  ...Array.from({ length: 2 }, (_, i) => `images/exhibition-5/gallery-3/studio${i + 1}.webp`),
];

// walk frames for the canvas sequence
const walkFrames = Array.from({ length: 64 }, (_, i) => `/images/exhibition-3/walk/${i + 1}walk.avif`);

export default function Loader() {
  const { setLoaded, loaded, setWalkBitmaps } = useStore();
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const [hideLoader, setHideLoader] = useState(false);
  const [domReady, setDomReady] = useState(false);
  const { setIsMobile, isMobile } = useStore();
  const [random, setRandom] = useState(0);

  useEffect(() => {
    setRandom(Math.floor(Math.random() * 4) + 1);
  }, []);

  // ---- preload helper for normal images ----
  const preloadAssets = (urls: string[]) =>
    new Promise<void>((resolve) => {
      let loadedCount = 0;
      const total = urls.length;

      if (total === 0) {
        setProgress(100);
        progressRef.current = 100;
        resolve();
        return;
      }

      urls.forEach((url) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          loadedCount++;
          const prog = (loadedCount / total) * 100; // full progress for critical assets
          setProgress(prog);
          progressRef.current = prog;
          if (loadedCount >= total) resolve();
        };
        img.src = url;
      });
    });

  // ---- initial setup ----
  useEffect(() => {
    if (isMobile == null) return;

    if (!isMobile) {
      useGLTF.preload('/3dc.glb');
      useEnvironment.preload({ files: '/black.exr' });
      const video = document.createElement('video');
      video.src = '/video.mp4';
      video.load();
    } else {
      const video1 = document.createElement('video');
      video1.src = '/scene1.mp4';
      video1.load();
      const video2 = document.createElement('video');
      video2.src = '/scene2.mp4';
      video2.load();
    }

    const onDOMContentLoaded = () => setDomReady(true);
    if (document.readyState === "complete" || document.readyState === "interactive") {
      setDomReady(true);
    } else {
      window.addEventListener("DOMContentLoaded", onDOMContentLoaded);
    }

    return () => window.removeEventListener("DOMContentLoaded", onDOMContentLoaded);
  }, [isMobile]);

  // ---- preload all assets ----
  useEffect(() => {
    if (isMobile == null) return;

    const loadAll = async () => {
      try {
        // 1. Load critical assets (blocking)
        await preloadAssets(assets);
        setLoaded(true);

        // 2. Load walk frames in background (Web Worker)
        const worker = new Worker('/loader.worker.js');
        worker.postMessage(walkFrames);

        worker.onmessage = (e) => {
          const bitmaps = e.data;
          if (bitmaps && bitmaps.length > 0) {
            setWalkBitmaps(bitmaps);
          }
          worker.terminate();
        };

        worker.onerror = (err) => {
          console.error("Worker error:", err);
          worker.terminate();
        };

      } catch (e) {
        console.error("Asset preload error:", e);
        setLoaded(true); // ensure loader hides even on error
      }
    };
    loadAll();
  }, [isMobile]);

  // ---- trigger hide loader ----
  useEffect(() => {
    if (loaded && domReady) setHideLoader(true);
  }, [loaded, domReady]);

  // ---- GSAP fadeout + post-load ----
  useGSAP(() => {
    if (!hideLoader) return;

    gsap.to('[data-gsap="loader-logo-full"]', {
      scale: 1.2,
      filter: "blur(10px)",
      opacity: 0,
      duration: 0.5,
      onComplete: () => {
        gsap.to('[data-gsap="loader"]', {
          opacity: 0,
          duration: 0.5
        });
      }
    })
  }, [hideLoader]);

  useGSAP(() => {
    gsap.to('[data-gsap="loader-logo"]', { clipPath: `inset(0% 0% ${progressRef.current}% 0%)`, duration: 0.1 });
  }, [progress])

  return (
    <div
      data-gsap="loader"
      className="pointer-events-none fixed top-0 left-0 w-screen h-[100dvh] bg-[#111111] z-[9999] flex items-center justify-center"
    >
      {random != 0 && (
        <>
          <img alt="loader icon" data-gsap="loader-logo-full" src={`/loader/loader${random}.webp?v=${random}`} className='absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[150px] md:w-[300px]' />
          <img alt="loader icon" data-gsap="loader-logo" src={`/loader/loader${random}.webp?v=${random}`} className='brightness-50 absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] w-[150px] md:w-[300px]' />
        </>
      )}
      {/* <p className="text-white text-h1">
        {loaded ? "loaded" : "loading " + Math.floor(progress) + "%"}
      </p> */}
    </div>
  );
}
