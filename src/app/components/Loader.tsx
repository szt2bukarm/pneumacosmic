"use client";
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { useStore } from '@/app/useStore';
import { useEnvironment, useGLTF } from '@react-three/drei';
import { useGSAP } from '@gsap/react';

const assets = [
  "images/bennszorult.webp",
  "images/paroslab.webp",
  "images/saroslab.webp",
  "images/lelegzofal.webp",
  "images/fal.webp",
  "images/akusztikus.webp",
  "logo.webp",
  "footerbanner.svg",
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
const walkFrames = Array.from({ length: 64 }, (_, i) => `images/exhibition-3/walk/${i+1}walk.avif`);

export default function Loader() {
  const { setLoaded, loaded, setWalkBitmaps } = useStore();
  const [progress, setProgress] = useState(0);
  const progressRef = useRef(0);
  const [hideLoader, setHideLoader] = useState(false);
  const [domReady, setDomReady] = useState(false);
  const { setIsMobile, isMobile } = useStore();

  // ---- preload helper for normal images ----
  const preloadAssets = (urls: string[]) =>
    new Promise<void>((resolve) => {
      let loadedCount = 0;
      const total = urls.length;

      urls.forEach((url) => {
        const img = new Image();
        img.onload = img.onerror = () => {
          loadedCount++;
          const prog = (loadedCount / total) * 50; // half of total progress
          setProgress(prog);
          progressRef.current = prog;
          if (loadedCount >= total) resolve();
        };
        img.src = url;
      });
    });

  // ---- preload walk frames ----
  const preloadWalkFrames = async () => {
    const bitmaps: ImageBitmap[] = [];
    for (let i = 0; i < walkFrames.length; i++) {
      const url = walkFrames[i];
      const res = await fetch(url);
      const blob = await res.blob();
      const bmp = await createImageBitmap(blob);
      bitmaps.push(bmp);

      // update progress for this part
      const prog = 50 + ((i + 1) / walkFrames.length) * 50; // second half
      setProgress(prog);
      progressRef.current = prog;
    }
    setWalkBitmaps(bitmaps);
  };

  // ---- initial setup ----
  useEffect(() => {
    if (isMobile == null) return;

    if (!isMobile) {
      useGLTF.preload('3dc.glb');
      useEnvironment.preload({ files: 'black.exr' });
      const video = document.createElement('video');
      video.src = 'video.mp4';
      video.load();
    } else {
      const video1 = document.createElement('video');
      video1.src = 'scene1.mp4';
      video1.load();
      const video2 = document.createElement('video');
      video2.src = 'scene2.mp4';
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
        await preloadAssets(assets);     // preload normal images
        await preloadWalkFrames();       // preload walk frames
        setLoaded(true);
      } catch (e) {
        console.error("Asset preload error:", e);
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
      <p className="text-white text-h1">
        {loaded ? "loaded" : "loading " + Math.floor(progress) + "%"}
      </p>
    </div>
  );
}
