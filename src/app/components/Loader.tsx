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
  ...Array.from({ length: 2 }, (_, i) => `/images/exhibition-2/gallery-1/${i + 1}.webp`),
  ...Array.from({ length: 2 }, (_, i) => `/images/exhibition-2/gallery-2/${i + 1}mtan.webp`),
  ...Array.from({ length: 2 }, (_, i) => `/images/exhibition-2/gallery-3/${i + 1}kecskemet.webp`),
  ...Array.from({ length: 2 }, (_, i) => `/images/exhibition-2/gallery-4/${i + 1}mta.webp`),
  ...Array.from({ length: 7 }, (_, i) => `/images/exhibition-2/MTA/${i}.webp`),
  ...Array.from({ length: 2 }, (_, i) => `/images/exhibition-3/gallery-1/${i + 1}general.webp`),
  ...Array.from({ length: 2 }, (_, i) => `/images/exhibition-3/gallery-2/${i + 1}werk.webp`),
  ...Array.from({ length: 3 }, (_, i) => `/images/exhibition-3/gallery-3/${i + 1}object.webp`),
  ...Array.from({ length: 3 }, (_, i) => `/images/exhibition-4/gallery-1/${i + 1}kiallitas.webp`),
  ...Array.from({ length: 2 }, (_, i) => `/images/exhibition-5/gallery-1/werk${i + 1}.webp`),
  ...Array.from({ length: 2 }, (_, i) => `/images/exhibition-5/gallery-2/mate${i + 1}.webp`),
  ...Array.from({ length: 2 }, (_, i) => `/images/exhibition-5/gallery-3/studio${i + 1}.webp`),
];

// walk frames for the canvas sequence
const walkFrames = Array.from({ length: 64 }, (_, i) => `/images/exhibition-3/walk/${i + 1}walk.avif`);

export default function Loader() {
  const { setLoaded, loaded, setWalkBitmaps, walkBitmaps } = useStore();
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const [hideLoader, setHideLoader] = useState(false);
  const [domReady, setDomReady] = useState(false);
  const { setIsMobile, isMobile } = useStore();
  const [random, setRandom] = useState(0);

  useEffect(() => {
    setRandom(Math.floor(Math.random() * 4) + 1);
  }, []);

  // ---- browser detection ----
  const getBrowserInfo = () => {
    if (typeof window === 'undefined') return { isSafari: false, isOldIOS: false };
    const ua = navigator.userAgent;

    // Detect iOS < 16
    const iosMatch = ua.match(/OS (\d+)_/);
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
    const isOldIOS = isIOS && iosMatch && parseInt(iosMatch[1], 10) < 16;

    // Detect Safari (Desktop)
    // Chrome/Edge user agents also contain "Safari", so we must check for "Safari" AND NOT "Chrome"
    const isSafari = /^((?!chrome|android).)*safari/i.test(ua);

    return { isSafari, isOldIOS };
  };

  // ---- preload helper for normal images ----
  const preloadAssets = (urls: string[], limit = 100) =>
    new Promise<void>((resolve) => {
      let loadedCount = 0;
      const total = urls.length;

      if (total === 0) {
        setProgress(limit);
        progressRef.current = limit;
        resolve();
        return;
      }

      urls.forEach((url) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          loadedCount++;
          const prog = (loadedCount / total) * limit;
          setProgress(prog);
          progressRef.current = prog;
          if (loadedCount >= total) resolve();
        };
        img.src = url;
      });
    });

  // ---- preload walk frames (main thread fallback) ----
  const preloadWalkFramesMainThread = async () => {
    let loadedCount = 0;
    const total = walkFrames.length;

    try {
      const promises = walkFrames.map(async (url) => {
        const res = await fetch(url);
        const blob = await res.blob();
        const bmp = await createImageBitmap(blob);

        loadedCount++;
        const prog = 50 + (loadedCount / total) * 50; // second half
        setProgress(prog);
        progressRef.current = prog;

        return bmp;
      });

      const bitmaps = await Promise.all(promises);
      setWalkBitmaps(bitmaps);
    } catch (e) {
      console.error("Walk frame preload error (main thread):", e);
    }
  };

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
        const { isSafari, isOldIOS } = getBrowserInfo();
        const shouldUseWorker = !isSafari && !isOldIOS;

        if (shouldUseWorker) {
          // STRATEGY A: Worker (Fast, Background)
          // 1. Load critical assets (blocking, 0-100%)
          await preloadAssets(assets, 100);
          setTimeout(() => setLoaded(true), 100);

          // 2. Load walk frames in background (Web Worker)
          if (!walkBitmaps || walkBitmaps.length === 0) {
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
          }

        } else {
          // STRATEGY B: Main Thread (Slow, Blocking) - Fallback for Safari/Old iOS
          // 1. Load critical assets (blocking, 0-50%)
          await preloadAssets(assets, 50);

          // 2. Load walk frames (blocking, 50-100%)
          if (!walkBitmaps || walkBitmaps.length === 0) {
            await preloadWalkFramesMainThread();
          } else {
            setProgress(100);
            progressRef.current = 100;
          }

          setTimeout(() => setLoaded(true), 100);
        }

      } catch (e) {
        console.error("Asset preload error:", e);
        setTimeout(() => setLoaded(true), 100);
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
